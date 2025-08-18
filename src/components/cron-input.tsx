'use client'

import { useState, useEffect, useMemo } from "react";

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

type PeriodValue = typeof Period[keyof typeof Period];
type DayKey = keyof typeof DaysOfWeek;

const dayKeyToCron: Record<DayKey, string> = {
    Monday: "1",
    Tuesday: "2",
    Wednesday: "3",
    Thursday: "4",
    Friday: "5",
    Saturday: "6",
    Sunday: "0",
};

const cronToDayKey: Record<string, DayKey> = {
    "1": "Monday",
    "2": "Tuesday",
    "3": "Wednesday",
    "4": "Thursday",
    "5": "Friday",
    "6": "Saturday",
    "0": "Sunday",
    "7": "Sunday",
    MON: "Monday",
    TUE: "Tuesday",
    WED: "Wednesday",
    THU: "Thursday",
    FRI: "Friday",
    SAT: "Saturday",
    SUN: "Sunday",
};

function isFivePartCron(value: string) {
    return value.trim().split(/\s+/).length === 5;
}

export function CronInput({
    onChange,
    defaultValue,
}: {
    onChange?: (value: string) => void;
    defaultValue?: string;
}) {
    const [period, setPeriod] = useState<PeriodValue>(Period.Day);
    const [hour, setHour] = useState("0");
    const [minute, setMinute] = useState("0");
    const [dayOfWeek, setDayOfWeek] = useState<DayKey>("Monday");

    // Compose cron from state
    const cron = useMemo(() => {
        const dow = period === Period.Day ? "*" : dayKeyToCron[dayOfWeek];
        return `${minute} ${hour} * * ${dow}`;
    }, [minute, hour, period, dayOfWeek]);

    // Emit onChange when cron changes
    useEffect(() => {
        onChange?.(cron);
    }, [cron, onChange]);

    // Parse provided defaultValue when it changes
    useEffect(() => {
        if (!defaultValue || typeof defaultValue !== "string") return;
        if (!isFivePartCron(defaultValue)) return;

        const [m, h, _dom, _mon, dowRaw] = defaultValue.trim().split(/\s+/);

        // Accept only simple values for now; if ranges/lists found, skip parsing for DOW
        const isSimple = (s: string) => !/[,*\/-]/.test(s) || /^(\d+)$/.test(s) || /^(MON|TUE|WED|THU|FRI|SAT|SUN)$/i.test(s);

        // Set hour/minute if they are numeric or *
        if (/^\d{1,2}$/.test(h)) setHour(h.padStart(1, ""));
        if (/^\d{1,2}$/.test(m)) setMinute(m.padStart(1, ""));

        if (dowRaw === "*") {
            setPeriod(Period.Day);
        } else if (isSimple(dowRaw)) {
            const key = cronToDayKey[dowRaw.toUpperCase?.() ?? dowRaw];
            if (key) {
                setDayOfWeek(key);
                setPeriod(Period.Week);
            } else {
                // Fallback to daily if unsupported
                setPeriod(Period.Day);
            }
        }
    }, [defaultValue]);

    return (
        <div className="flex items-center gap-2">
            <span className="text-sm">Her</span>
            <Select
                onValueChange={(value) => setPeriod(value as PeriodValue)}
                value={period}
            >
                <SelectTrigger className="w-32">
                    <SelectValue placeholder="Periyot" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value={Period.Day}>Gün</SelectItem>
                    <SelectItem value={Period.Week}>Hafta</SelectItem>
                </SelectContent>
            </Select>

            {period === Period.Week && (
                <Select
                    onValueChange={(value) => setDayOfWeek(value as DayKey)}
                    value={dayOfWeek}
                >
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
