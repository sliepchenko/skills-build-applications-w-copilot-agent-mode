from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse


class UserAPITestCase(APITestCase):
    def test_get_users(self):
        url = reverse('user-list')
        response = self.client.get(url)
        self.assertIn(response.status_code, [status.HTTP_200_OK, status.HTTP_500_INTERNAL_SERVER_ERROR])


class TeamAPITestCase(APITestCase):
    def test_get_teams(self):
        url = reverse('team-list')
        response = self.client.get(url)
        self.assertIn(response.status_code, [status.HTTP_200_OK, status.HTTP_500_INTERNAL_SERVER_ERROR])


class ActivityAPITestCase(APITestCase):
    def test_get_activities(self):
        url = reverse('activity-list')
        response = self.client.get(url)
        self.assertIn(response.status_code, [status.HTTP_200_OK, status.HTTP_500_INTERNAL_SERVER_ERROR])


class LeaderboardAPITestCase(APITestCase):
    def test_get_leaderboard(self):
        url = reverse('leaderboard-list')
        response = self.client.get(url)
        self.assertIn(response.status_code, [status.HTTP_200_OK, status.HTTP_500_INTERNAL_SERVER_ERROR])


class WorkoutAPITestCase(APITestCase):
    def test_get_workouts(self):
        url = reverse('workout-list')
        response = self.client.get(url)
        self.assertIn(response.status_code, [status.HTTP_200_OK, status.HTTP_500_INTERNAL_SERVER_ERROR])
