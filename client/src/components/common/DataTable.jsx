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
      <div className="rounded-lg border border-white/10 bg-slate-900/50 backdrop-blur-sm overflow-hidden">
        <TableWrapper>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-white/5 bg-slate-950/50">
              {columns.map((col, index) => (
                <TableHead key={index} className="text-slate-400 font-semibold">{col.header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-slate-500">
                  No results found.
                </TableCell>
              </TableRow>
            ) : (
              data.map((row, rowIndex) => (
                <TableRow 
                  key={row.id || rowIndex} 
                  className={`border-white/5 hover:bg-slate-800/50 transition-colors ${onRowClick ? 'cursor-pointer' : ''}`}
                  onClick={() => onRowClick && onRowClick(row)}
                >
                  {columns.map((col, colIndex) => (
                    <TableCell key={colIndex} className="text-slate-300">
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
