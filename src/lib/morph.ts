import { Project, SyntaxKind } from "ts-morph"

export function wrapTestWithParams(test_filename: string, input_filename: string) {
    const project = new Project({
        skipFileDependencyResolution: true,
    });
    const sourceFile = project.addSourceFileAtPath(test_filename);

    // If source already has an import for the input file, skip parameterization
    const existingImports = sourceFile.getImportDeclarations()
        .filter(importDecl => importDecl.getModuleSpecifierValue() === `./${input_filename}`);
    if (existingImports.length > 0) {
        console.log('File already parameterized, skipping');
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
        console.log('No test calls found in the file');
        return;
    }

    // Get the first test call
    const testCall = testCalls[0];
    const args = testCall.getArguments();
    if (args.length < 2) {
        console.log('Test call must have at least 2 arguments (name and function)');
        return;
    }

    const testName = args[0];
    const testFunction = args[1];

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