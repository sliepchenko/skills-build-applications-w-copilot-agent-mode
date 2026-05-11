from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from fitness.models import UserProfile, Activity, Team
from datetime import timedelta, datetime
import random

class Command(BaseCommand):
    help = 'Populate the database with sample data'

    def handle(self, *args, **options):
        # Create users
        users_data = [
            {'username': 'alice', 'email': 'alice@example.com', 'first_name': 'Alice', 'last_name': 'Smith'},
            {'username': 'bob', 'email': 'bob@example.com', 'first_name': 'Bob', 'last_name': 'Johnson'},
            {'username': 'charlie', 'email': 'charlie@example.com', 'first_name': 'Charlie', 'last_name': 'Brown'},
            {'username': 'diana', 'email': 'diana@example.com', 'first_name': 'Diana', 'last_name': 'Prince'},
            {'username': 'eve', 'email': 'eve@example.com', 'first_name': 'Eve', 'last_name': 'Adams'},
        ]

        users = []
        for data in users_data:
            user, created = User.objects.get_or_create(
                username=data['username'],
                defaults={
                    'email': data['email'],
                    'first_name': data['first_name'],
                    'last_name': data['last_name'],
                }
            )
            if created:
                user.set_password('password123')
                user.save()
            users.append(user)

        # Profiles are created via signal

        # Create activities
        activity_types = ['running', 'cycling', 'swimming', 'walking', 'yoga', 'weightlifting']
        for user in users:
            for _ in range(random.randint(5, 15)):
                Activity.objects.create(
                    user=user,
                    activity_type=random.choice(activity_types),
                    duration=timedelta(minutes=random.randint(30, 120)),
                    distance=random.uniform(1, 20) if random.choice([True, False]) else None,
                    calories=random.randint(100, 1000) if random.choice([True, False]) else None,
                    date=datetime.now() - timedelta(days=random.randint(0, 30))
                )

        # Create teams
        team_data = [
            {'name': 'Runners Club', 'description': 'For running enthusiasts'},
            {'name': 'Cyclists United', 'description': 'Bike lovers unite'},
            {'name': 'Swim Team', 'description': 'Swimming pros'},
        ]

        for data in team_data:
            team = Team.objects.create(
                name=data['name'],
                description=data['description'],
                created_by=random.choice(users)
            )
            # Add random members
            members = random.sample(users, random.randint(2, len(users)))
            team.members.set(members)

        self.stdout.write(self.style.SUCCESS('Successfully populated the database'))
