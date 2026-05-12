from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout
from datetime import date


class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Clear existing data
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        self.stdout.write('Cleared existing data...')

        # Create superhero users
        users_data = [
            {'username': 'ironman', 'email': 'tony@avengers.com', 'password': 'password123'},
            {'username': 'spiderman', 'email': 'peter@avengers.com', 'password': 'password123'},
            {'username': 'blackwidow', 'email': 'natasha@avengers.com', 'password': 'password123'},
            {'username': 'batman', 'email': 'bruce@justiceleague.com', 'password': 'password123'},
            {'username': 'superman', 'email': 'clark@justiceleague.com', 'password': 'password123'},
            {'username': 'wonderwoman', 'email': 'diana@justiceleague.com', 'password': 'password123'},
        ]

        users = []
        for data in users_data:
            user = User.objects.create(**data)
            users.append(user)
            self.stdout.write(f"Created user: {user.username}")

        # Create teams
        team_marvel = Team.objects.create(
            name='Team Marvel',
            members=['ironman', 'spiderman', 'blackwidow'],
        )
        team_dc = Team.objects.create(
            name='Team DC',
            members=['batman', 'superman', 'wonderwoman'],
        )
        self.stdout.write(f"Created team: {team_marvel.name}")
        self.stdout.write(f"Created team: {team_dc.name}")

        # Create activities
        activities_data = [
            {'username': 'ironman', 'activity_type': 'Flying', 'duration': '01:30:00', 'date': date(2026, 5, 1)},
            {'username': 'spiderman', 'activity_type': 'Web Swinging', 'duration': '00:45:00', 'date': date(2026, 5, 2)},
            {'username': 'blackwidow', 'activity_type': 'Martial Arts', 'duration': '01:00:00', 'date': date(2026, 5, 3)},
            {'username': 'batman', 'activity_type': 'Cape Gliding', 'duration': '00:50:00', 'date': date(2026, 5, 4)},
            {'username': 'superman', 'activity_type': 'Super Speed Running', 'duration': '00:15:00', 'date': date(2026, 5, 5)},
            {'username': 'wonderwoman', 'activity_type': 'Lasso Training', 'duration': '01:15:00', 'date': date(2026, 5, 6)},
        ]
        for data in activities_data:
            activity = Activity.objects.create(**data)
            self.stdout.write(f"Created activity: {activity.username} - {activity.activity_type}")

        # Create leaderboard entries
        leaderboard_data = [
            {'username': 'ironman', 'score': 980},
            {'username': 'superman', 'score': 1200},
            {'username': 'spiderman', 'score': 850},
            {'username': 'wonderwoman', 'score': 1100},
            {'username': 'batman', 'score': 920},
            {'username': 'blackwidow', 'score': 875},
        ]
        for data in leaderboard_data:
            entry = Leaderboard.objects.create(**data)
            self.stdout.write(f"Created leaderboard entry: {entry.username} - {entry.score}")

        # Create workouts
        workouts_data = [
            {
                'name': 'Avengers Endurance',
                'description': 'A high-intensity workout inspired by the Avengers',
                'exercises': ['Push-ups', 'Pull-ups', 'Squats', 'Sprints', 'Planks'],
            },
            {
                'name': 'Justice League Strength',
                'description': 'Strength training for Justice League heroes',
                'exercises': ['Deadlifts', 'Bench Press', 'Overhead Press', 'Rows', 'Lunges'],
            },
            {
                'name': 'Iron Man Cardio',
                'description': 'Cardio circuit inspired by Iron Man',
                'exercises': ['Jumping Jacks', 'Burpees', 'Mountain Climbers', 'High Knees', 'Jump Rope'],
            },
        ]
        for data in workouts_data:
            workout = Workout.objects.create(**data)
            self.stdout.write(f"Created workout: {workout.name}")

        self.stdout.write(self.style.SUCCESS('Successfully populated the octofit_db database with test data'))
