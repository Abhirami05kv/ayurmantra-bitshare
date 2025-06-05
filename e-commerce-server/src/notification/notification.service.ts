// src/notifications/notification.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as admin from 'firebase-admin';
import { Notification } from './entities/notification.entity';
import { Order } from 'src/orders/entities/order.entity';
import { User } from 'src/auth/entities/auth.entity';
import { UserRole } from 'src/auth/user-role.enum';
import { FirebaseAdminService } from './FirebaseAdminService';


@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepo: Repository<Notification>,
     @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly firebaseAdminService: FirebaseAdminService
  ) {}

  async createNotification(orderId: number, userName: string): Promise<Notification> {
    const existingNotification = await this.notificationRepo.findOne({
      where: { orderId, userName },
    });
  
    if (existingNotification) {
      console.log(`Notification already exists for order #${orderId} and user ${userName}`);
      return existingNotification;
    }
  
    const notification = this.notificationRepo.create({ orderId, userName });
    const saved = await this.notificationRepo.save(notification);
    console.log('SAVED NOTIFICATION:', saved);
    return saved;
  }
  
  

  async getNotifications(): Promise<Notification[]> {
    return this.notificationRepo.find({
      order: { createdAt: 'DESC' },
    });
  }

  async markAsRead(orderId: number): Promise<Notification> {
    return this.notificationRepo.save({ orderId, isRead: true });
  }



  async sendNotification(fcmToken: string, title: string, body: string) {
    const message = {
      notification: { title, body },
      token: fcmToken,
    };
  
    try {
      const response = await admin.messaging().send(message);
      console.log('FCM response:', response);
      return response;
    } catch (error) {
      console.error('FCM error:', error);
      throw error;
    }
  }
  


  async sendOrderNotificationToAdmins(order: Order, user: User): Promise<string[]> {
    const admins = await this.userRepository.find({
      where: { role: UserRole.ADMIN },
      select: ['id', 'name', 'deviceToken'],
    });

    const now = new Date();
    const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const formattedDate = now.toLocaleDateString('en-GB', {
      day: '2-digit',
      weekday: 'short',
      year: 'numeric',
    });

    const title = 'New Order';
    const body = `OrderId #${order.id} by ${user.name} on ${formattedDate} at ${formattedTime}`;

    const messages: string[] = [];

    for (const admin of admins) {
      await this.createNotification(order.id, user.name);

      if (admin.deviceToken) {
        await this.sendNotification(admin.deviceToken, title, body);
        messages.push(`Notification sent to ${admin.name}`);
      } else {
        messages.push(`No FCM token for ${admin.name}`);
      }
    }

    return messages;
  }

  // async sendOrderNotificationToAdmins(order: Order, user: User): Promise<string[]> {
  //   if (!order || !user) {
  //     throw new Error('Order and user details are required');
  //   }

  //   const admins = await this.userRepository.find({
  //     where: { role: UserRole.ADMIN },
  //     select: ['id', 'name', 'fcm_token'],
  //   });

  //   if (admins.length === 0) {
  //     console.warn('No admin users found to notify');
  //     return ['No admin users found'];
  //   }

  //   const now = new Date();
  //   const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  //   const formattedDate = now.toLocaleDateString('en-GB', {
  //     day: '2-digit',
  //     weekday: 'short',
  //     year: 'numeric',
  //   });

  //   const title = 'New Order';
  //   const body = `OrderId #${order.id} by ${user.name} on ${formattedDate} at ${formattedTime}`;

  //   const results: string[] = [];
  //   // const notificationPromises: Promise<void>[] = [];

  //   // First create the notification record
  //   await this.createNotification(order.id, user.name);

  // for (const admin of admins) {
  //   if (!admin.fcm_token) {
  //     results.push(`Admin ${admin.name} has no FCM token`);
  //     continue;
  //   }

  //   try {
  //     await this.firebaseAdminService.sendNotificationToToken(admin.fcm_token, title, body);
  //     results.push(`Notification sent to ${admin.name}`);
  //   } catch (err) {
  //     results.push(`Failed to notify ${admin.name}: ${err.message}`);
  //   }
  // }

  // return results;
  // }

  

}
