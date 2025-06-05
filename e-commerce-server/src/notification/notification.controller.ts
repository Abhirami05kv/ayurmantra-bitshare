// src/notifications/notification.controller.ts
import { Controller, Get, Patch, Param, Post, Body } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/auth/user-role.enum';
import { FirebaseAdminService } from './FirebaseAdminService';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService,
    private readonly firebaseAdminService: FirebaseAdminService
  ) {}

  @Get()
  @Roles(UserRole.ADMIN)
  async getAllNotifications() {
    return this.notificationService.getNotifications();
  }

  @Patch(':orderId/read')
  updateNotification(@Param('orderId') orderId: string) {
    return this.notificationService.markAsRead(Number(orderId));
  }

  @Post('test')
  async sendTestNotification(@Body() body: { token: string }) {
    const { token } = body;
    return this.firebaseAdminService.sendNotificationToToken(
      token,
      'Test Notification 🚀',
      'This is a test push from backend!',
    );
  }
}
