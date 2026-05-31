import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/register/register').then(m => m.RegisterComponent)
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadComponent: () => import('./features/dashboard/dashboard').then(m => m.DashboardComponent) },
      { path: 'users', loadComponent: () => import('./features/users/user-list/user-list').then(m => m.UserListComponent) },
      { path: 'audit-logs', loadComponent: () => import('./features/users/audit-log-list/audit-log-list').then(m => m.AuditLogListComponent) },
      { path: 'products', loadComponent: () => import('./features/products/product-list/product-list').then(m => m.ProductListComponent) },
      { path: 'suppliers', loadComponent: () => import('./features/products/supplier-list/supplier-list').then(m => m.SupplierListComponent) },
      { path: 'orders', loadComponent: () => import('./features/products/supplier-order-list/supplier-order-list').then(m => m.SupplierOrderListComponent) },
      { path: 'purchase-requests', loadComponent: () => import('./features/products/purchase-request-list/purchase-request-list').then(m => m.PurchaseRequestListComponent) },
      { path: 'departments', loadComponent: () => import('./features/departments/department-list/department-list').then(m => m.DepartmentListComponent) },
      { path: 'requests/my', loadComponent: () => import('./features/requests/my-requests/my-requests').then(m => m.MyRequestsComponent) },
      { path: 'requests/all', loadComponent: () => import('./features/requests/all-requests/all-requests').then(m => m.AllRequestsComponent) },
      { path: 'requests/approve', loadComponent: () => import('./features/requests/approval-queue/approval-queue').then(m => m.ApprovalQueueComponent) },
      { path: 'warehouse', loadComponent: () => import('./features/warehouse/warehouse-list/warehouse-list').then(m => m.WarehouseListComponent) },
      { path: 'inventory', loadComponent: () => import('./features/warehouse/inventory-list/inventory-list').then(m => m.InventoryListComponent) },
      { path: 'stock', loadComponent: () => import('./features/warehouse/stock-movements/stock-movements').then(m => m.StockMovementsComponent) },
      { path: 'deliveries', loadComponent: () => import('./features/deliveries/delivery-list/delivery-list').then(m => m.DeliveryListComponent) },
      { path: 'invoices', loadComponent: () => import('./features/billing/invoice-list/invoice-list').then(m => m.InvoiceListComponent) },
      { path: 'payments', loadComponent: () => import('./features/billing/payment-list/payment-list').then(m => m.PaymentListComponent) },
      { path: 'notifications', loadComponent: () => import('./features/notifications/notification-list/notification-list').then(m => m.NotificationListComponent) },
      { path: 'kpis', loadComponent: () => import('./features/reports/kpi-dashboard/kpi-dashboard').then(m => m.KpiDashboardComponent) },
      { path: 'reports', loadComponent: () => import('./features/reports/report-list/report-list').then(m => m.ReportListComponent) },
      { path: 'audit-packages', loadComponent: () => import('./features/reports/audit-packages/audit-packages').then(m => m.AuditPackagesComponent) },
      
    ]
  },
  { path: '**', redirectTo: 'login' }
];
