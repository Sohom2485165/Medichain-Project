import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentRequestService } from '../../../core/services/department-request.service';
import { DepartmentRequest } from '../../../core/models/models';

@Component({
  selector: 'app-approval-queue',
  imports: [CommonModule],
  templateUrl: './approval-queue.html'
})
export class ApprovalQueueComponent implements OnInit {
  private svc = inject(DepartmentRequestService);
  requests: DepartmentRequest[] = [];
  loading = false; message = ''; error = '';
  acting: number | null = null;

  ngOnInit() { this.load(); }

  load() {
    this.loading = true;
    this.svc.getAll().subscribe({
      next: all => {
        this.requests = all.filter(r => r.status === 'PENDING');
        this.loading = false;
      },
      error: () => { this.error = 'Failed to load.'; this.loading = false; }
    });
  }

  approve(id: number) {
    this.acting = id;
    this.svc.approve(id).subscribe({
      next: () => { this.message = `Request #${id} approved.`; this.load(); this.acting = null; },
      error: err => { this.error = err.error || 'Failed.'; this.acting = null; }
    });
  }

  reject(id: number) {
    this.acting = id;
    this.svc.reject(id).subscribe({
      next: () => { this.message = `Request #${id} rejected.`; this.load(); this.acting = null; },
      error: err => { this.error = err.error || 'Failed.'; this.acting = null; }
    });
  }
}
