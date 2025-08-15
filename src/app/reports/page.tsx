import { Button } from "@/components/ui/button";
import { deleteReport, getReports } from "@/actions/reports"
import { ArrowRight, Trash } from "lucide-react";
import Link from "next/link";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { revalidatePath } from "next/cache";

export default async function ReportsPage() {
    const reports = await getReports();

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Raporlar</h1>
                <Button>Rapor Yükle</Button>
            </div>
            <Table>
                <TableCaption>
                    Test raporları local olarak testler çalıştırıldığında oluşturulur.
                    Bu raporlar <code className="font-mono">/public/reports</code> klasöründe saklanır.
                    <br />
                    CI/CD'den veya dışarıdan alınan raporları buraya eklemek için
                    <span className="font-semibold"> Rapor Yükle</span> butonunu kullanabilirsiniz.
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Rapor Tarihi</TableHead>
                        <TableHead></TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {reports.map((report) => (
                        <TableRow key={report.path}>
                            <TableCell>{report.path}</TableCell>
                            <TableCell className="flex justify-end">
                                <Link href={`/reports/${report.path}`} className="flex items-center gap-2">
                                    <ArrowRight />
                                    Görüntüle
                                </Link>
                            </TableCell>
                            <TableCell>
                                <form action={async () => {
                                    "use server"
                                    await deleteReport(report.path);
                                    revalidatePath("/reports");
                                }}>
                                    <button type="submit" className="flex items-center gap-2 w-full">
                                        <Trash />
                                        Sil
                                    </button>
                                </form>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}