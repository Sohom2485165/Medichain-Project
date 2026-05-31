import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.html'
})
export class NavbarComponent implements OnInit {
  auth = inject(AuthService);
  private notifService = inject(NotificationService);

  name = '';
  role = '';
  userId = 0;
  unreadCount = 0;

  ngOnInit() {
    this.name = this.auth.getName();
    this.role = this.auth.getRole();
    this.userId = Number(this.auth.getUserId());
    this.loadUnreadCount();
    setInterval(() => this.loadUnreadCount(), 30000);
  }

  loadUnreadCount() {
    if (this.userId) {
      this.notifService.getUnreadCount(this.userId).subscribe({
        next: res => this.unreadCount = res.unreadCount,
        error: () => {}
      });
    }
  }

  logout() { this.auth.logout(); }
}
