import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ITableRowClick } from '@shared/interfaces/table-row-click.interface';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [TableModule, CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent<T extends Record<string, any>> implements OnInit {
  @Input() data!: T[];
  @Input() headers!: Record<string, string>;
  @Input() css: Record<string, any> | null | undefined;

  @Output() rowClick = new EventEmitter<ITableRowClick<T>>();

  ngOnInit() {
    if (!this.headers) {
      const dataKeys = this.data.length ? Object.keys(this.data[0] as object) : [];
      this.headers = Object.fromEntries(dataKeys.map(key => [key, key]));
    }
  }

  onRowClick(item: T, column: string) {
    this.rowClick.emit({ item, column });
  }

  noSort = () => 0;
}
