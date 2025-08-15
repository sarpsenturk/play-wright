'use server'

import { Report } from "@/lib/types";

import * as fs from "fs/promises";
import * as path from "path";

const REPORT_DIR = "public/reports";

export async function getReports(): Promise<Report[]> {
    const reports = await fs.readdir(REPORT_DIR);
    return reports.map((report) => ({
        path: path.join(report),
    }));
}

export async function deleteReport(reportPath: string): Promise<void> {
    await fs.rmdir(path.join(REPORT_DIR, reportPath), { recursive: true });
}