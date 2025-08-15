import { Button } from "@/components/ui/button";
import { deleteReport, getReports } from "@/actions/reports"
import { Trash } from "lucide-react";
import Link from "next/link";

export default async function ReportsPage() {
    const reports = await getReports();

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Raporlar</h1>
                <Button>Rapor Yükle</Button>
            </div>
            <div className="flex flex-col gap-3">
                <p className="text-sm text-muted-foreground">
                    Test raporları local olarak testler çalıştırıldığında oluşturulur.
                    Bu raporlar <code className="font-mono">/reports</code> klasöründe saklanır.
                </p>
                <p className="text-sm text-muted-foreground">
                    CI/CD'den veya dışarıdan alınan raporları buraya eklemek için
                    <span className="font-semibold"> Rapor Yükle</span> butonunu kullanabilirsiniz.
                </p>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reports.map((report) => (
                    <li key={report.path} className="flex flex-col gap-4 border rounded-md p-4">
                        <div className="flex items-center justify-between">
                            <span className="text-lg font-semibold">{report.path}</span>
                            <form action={async () => {
                                "use server"
                                await deleteReport(report.path);
                            }}>
                                <Button type="submit" variant="ghost" size="icon" className="text-[var(--color-destructive)]">
                                    <span className="sr-only">Sil</span>
                                    <Trash />
                                </Button>
                            </form>
                        </div>
                        <Button variant="link" asChild>
                            <Link href={`/reports/${encodeURIComponent(report.path)}`}>
                                Raporu Görüntüle
                            </Link>
                        </Button>
                    </li>
                ))}
            </ul>
        </div>
    )
}