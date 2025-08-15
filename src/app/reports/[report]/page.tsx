import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import path from "node:path";

export default async function ReportPage({
    params,
}: {
    params: Promise<{ report: string }>
}) {
    const { report } = await params;
    const reportPath = path.join("reports", report, "index.html");
    return (
        <div className="flex flex-col gap-3 w-full h-full">
            <Button variant="link" asChild className="self-start">
                <Link href="/reports">
                    <ArrowLeft />
                    <span>Raporlara Dön</span>
                </Link>
            </Button>
            <iframe src={`/${reportPath}`} title={`Rapor: ${report}`} className="flex-1" />
        </div>
    )
}