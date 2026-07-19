import React from 'react';
import { TableWrapper, TableHeader, TableBody, TableRow, TableHead, TableCell } from './TableWrapper';
import { SearchBar } from './SearchBar';
import { motion } from 'framer-motion';

export function DataTable({ columns, data, onRowClick, searchable = true, placeholder = "Search..." }) {
  return (
    <div className="space-y-4">
      {searchable && (
        <div className="flex justify-between items-center">
          <SearchBar placeholder={placeholder} />
        </div>
      )}
      <div className="rounded-lg border border-border bg-card shadow-sm overflow-hidden">
        <TableWrapper>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-border bg-muted/50">
              {columns.map((col, index) => (
                <TableHead key={index} className="text-muted-foreground font-semibold">{col.header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                  No results found.
                </TableCell>
              </TableRow>
            ) : (
              data.map((row, rowIndex) => (
                <TableRow 
                  key={row.id || rowIndex} 
                  className={`border-border hover:bg-muted/50 transition-colors ${onRowClick ? 'cursor-pointer' : ''}`}
                  onClick={() => onRowClick && onRowClick(row)}
                >
                  {columns.map((col, colIndex) => (
                    <TableCell key={colIndex} className="text-foreground">
                      {col.cell ? col.cell(row) : row[col.accessorKey]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </TableWrapper>
      </div>
    </div>
  );
}
