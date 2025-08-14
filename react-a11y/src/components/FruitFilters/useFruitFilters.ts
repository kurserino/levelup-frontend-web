"use client";
import { useMemo, useState } from "react";
import type { Fruit } from "@/data/fruits";

export type FruitSort = "name-asc" | "name-desc";

type FiltersState = {
	search: string;
	sortBy: FruitSort;
};

export function useFruitFilters(initialFruits: Fruit[]) {
	const [filters, setFilters] = useState<FiltersState>({ search: "", sortBy: "name-asc" });

	const filteredFruits = useMemo(() => {
		const byName = initialFruits.filter((f) => f.name.toLowerCase().includes(filters.search.trim().toLowerCase()));
		const sorted = [...byName].sort((a, b) => {
			if (filters.sortBy === "name-asc") return a.name.localeCompare(b.name);
			return b.name.localeCompare(a.name);
		});
		return sorted;
	}, [initialFruits, filters.search, filters.sortBy]);

	function setSearch(value: string) {
		setFilters((prev) => ({ ...prev, search: value }));
	}

	function setSortBy(value: FruitSort) {
		setFilters((prev) => ({ ...prev, sortBy: value }));
	}

	return { filters, filteredFruits, setSearch, setSortBy } as const;
}



