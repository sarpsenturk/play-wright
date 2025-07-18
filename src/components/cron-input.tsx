'use client'

import { useState, useEffect } from "react";

import { Input } from "./ui/input";
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from "./ui/select";

const Period = {
    Day: "day",
    Week: "week",
} as const;

const DaysOfWeek = {
    Monday: "Pzt",
    Tuesday: "Sal",
    Wednesday: "Çar",
    Thursday: "Per",
    Friday: "Cum",
    Saturday: "Cmt",
    Sunday: "Paz",
} as const;



export function CronInput({
    onChange,
}: {
    onChange?: (value: string) => void;
}) {
    const [period, setPeriod] = useState<typeof Period[keyof typeof Period]>(Period.Day);
    const [hour, setHour] = useState("0");
    const [minute, setMinute] = useState("0");

    const cron = `${minute} ${hour} * * ${period === Period.Day ? "*" : "1"}`;

    useEffect(() => {
        onChange?.(cron);
    }, [cron, onChange]);

    return (
        <div className="flex items-center gap-2">
            <span className="text-sm">Her</span>
            <Select onValueChange={(value) => setPeriod(value as typeof Period[keyof typeof Period])} defaultValue={Period.Day}>
                <SelectTrigger className="w-32">
                    <SelectValue placeholder="Periyot" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value={Period.Day}>Gün</SelectItem>
                    <SelectItem value={Period.Week}>Hafta</SelectItem>
                </SelectContent>
            </Select>

            {period === Period.Week && (
                <Select onValueChange={(value) => setHour(value)} defaultValue="Monday">
                    <SelectTrigger className="w-32">
                        <SelectValue placeholder="Gün" />
                    </SelectTrigger>
                    <SelectContent>
                        {Object.entries(DaysOfWeek).map(([key, value]) => (
                            <SelectItem key={key} value={key}>
                                {value}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            )}

            <span className="text-sm">saat</span>
            <Input
                type="time"
                value={`${hour.padStart(2, '0')}:${minute.padStart(2, '0')}`}
                onChange={(e) => {
                    const [h, m] = e.target.value.split(":");
                    setHour(h);
                    setMinute(m);
                }}
            />
        </div>
    )
}
