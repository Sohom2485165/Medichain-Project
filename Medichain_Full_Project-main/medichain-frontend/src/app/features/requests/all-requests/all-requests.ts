import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DepartmentRequestService } from '../../../core/services/department-request.service';
import { DepartmentRequest } from '../../../core/models/models';

@Component({
  selector: 'app-all-requests',
  imports: [CommonModule, FormsModule],
  templateUrl: './all-requests.html'
})
export class AllRequestsComponent implements OnInit {
  private svc = inject(DepartmentRequestService);
  all: DepartmentRequest[] = [];
  filtered: DepartmentRequest[] = [];
  loading = false; error = '';
  filterStatus = '';
  statuses = ['', 'PENDING', 'APPROVED', 'REJECTED', 'IN_DELIVERY', 'DELIVERED', 'CLOSED'];

  ngOnInit() { this.load(); }

  load() {
    this.loading = true;
    this.svc.getAll().subscribe({
      next: d => { this.all = d; this.applyFilter(); this.loading = false; },
      error: () => { this.error = 'Failed to load.'; this.loading = false; }
    });
  }

  applyFilter() {
    this.filtered = this.filterStatus
      ? this.all.filter(r => r.status === this.filterStatus)
      : [...this.all];
  }

  countByStatus(status: string): number {
    return this.all.filter(r => r.status === status).length;
  }
}
