import { CallExpression, Node, Project, SyntaxKind, ts } from "ts-morph"

function findInputs(testFunction: Node<ts.Node>): CallExpression<ts.CallExpression>[] {
    return testFunction.getDescendantsOfKind(SyntaxKind.CallExpression)
        .filter(call => call.getText().includes('fill'));
}

function getInputNames(inputs: CallExpression<ts.CallExpression>[]): string[] {
    return inputs.map(input => {
        const left = input.getExpression().asKind(SyntaxKind.PropertyAccessExpression)!;
        const getByRole = left.getExpression().asKind(SyntaxKind.CallExpression)!;
        const args = getByRole.getArguments();
        const options = args[1].asKind(SyntaxKind.ObjectLiteralExpression)!;
        const nameProperty = options.getProperty('name')!.asKind(SyntaxKind.PropertyAssignment)!;
        const nameInitializer = nameProperty.getInitializer()!.asKind(SyntaxKind.StringLiteral)!;
        return nameInitializer.getText().slice(1, -1); // Remove quotes
    });
}

export function wrapTestWithParams(test_filename: string, input_filename: string) {
    const project = new Project({
        skipFileDependencyResolution: true,
    });
    const sourceFile = project.addSourceFileAtPath(test_filename);

    // If source already has an import for the input file, skip parameterization
    const existingImports = sourceFile.getImportDeclarations()
        .filter(importDecl => importDecl.getModuleSpecifierValue() === `./${input_filename}`);
    if (existingImports.length > 0) {
        console.error('File already parameterized, skipping');
        return;
    }

    // Add import statement at the top of the file
    sourceFile.addImportDeclaration({
        moduleSpecifier: `./${input_filename}`,
        defaultImport: "data"
    });

    // Find all test calls in the file
    const testCalls = sourceFile.getDescendantsOfKind(SyntaxKind.CallExpression)
        .filter(call => {
            const expression = call.getExpression();
            return expression.getKind() === SyntaxKind.Identifier &&
                expression.getText() === 'test';
        });

    if (testCalls.length === 0) {
        console.error('No test calls found in the file');
        return;
    }

    // Get the first test call
    const testCall = testCalls[0];
    const args = testCall.getArguments();
    if (args.length < 2) {
        console.error('Test call must have at least 2 arguments (name and function)');
        return;
    }

    const testName = args[0];
    const testFunction = args[1];

    // Find inputs
    const inputs = findInputs(testFunction);

    // Get the name of the input field
    const inputNames = getInputNames(inputs);

    inputNames.forEach((name) => {
        const input = inputs.find(input => input.getText().includes(name))!;
        input.removeArgument(0);
        input.insertArgument(0, `item['${name}']`);
    });

    // Create the wrapper code that uses the imported data
    const testNameText = testName.getText().slice(1, -1); // Remove quotes
    const testFunctionText = testFunction.getText();

    const wrapperCode = `data.forEach((item, idx) => {
    test(\`${testNameText} iteration \${idx}\`, ${testFunctionText});
});`;

    // Replace the original test call with the wrapper
    sourceFile.removeStatement(2);
    sourceFile.insertStatements(2, wrapperCode);

    // Reformat the file for better readability
    sourceFile.formatText({
        indentSize: 2,
    });

    // Save the modified file
    sourceFile.saveSync();
}