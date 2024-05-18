# My Uni Progress 1.1.1

- For an explanation in ***ENGLISH***, go to [About this app](#about-this-app)

# Acerca De:
Me llamo Luis.
Actualmente soy estudiante de la carrera de Ingeniería en Ciencias y Sistemas de la Universidad de San Carlos de
Guatemala (empecé en 2022), pero la administración de mi pénsum
  se me hace algo complicada por cómo está estructurada. Por eso creé esta página. Esta página ayuda a administrar
  mejor el transcurso de la carrera.

## Inicio
Al iniciar la página o al ir a la página principal, seguramente viste los semestres con sus respectivos cursos.
  Al darle clic a alguno de esos cursos, podrás ver cuáles son sus prerrequisitos, así como en qué cursos solicitan
  ese curso seleccionado, entre otra información.
  También cuenta con un apartado donde podrás ver las estadísticas de tu progreso en la carrera.

## Mi Ruta
  ¡Aquí puedes diseñar tu ruta en la carrera! Primero, necesitas iniciar sesión, de otro modo no podrás acceder.
  Luego, Seleccionas un período
  (Primer Semestre, Vacaciones Junio, Segundo Semestre o Vacaciones Diciembre) y un año,
  y luego elijes los cursos que cursarás en esos períodos.

Cuenta también con estadísticas de tu progreso general (el progreso actual que tienes en la carrera)
  y el progreso conforme vas diseñando tu ruta.

Finalmente hasta abajo tiene otra vez el mismo apartado de semestre de la página Inicio para que puedas examinar
  los cursos (ver información de la página Inicio)

## Mi Perfil
Aquí podrás gestionar los cursos. Podrás marcar cada curso ya sea como aprobado, o desaprobado. Recuerda que no puedes marcar un curso como aprobado si se encuentra previamente en un período. Esto es porque en los períodos se encuentran cursos únicamente no aprobados.

## Disclaimer:
Soy un desarrollador Junior, por lo que esta página puede tener algunos errores. Conforme vaya yo notando errores o
  surjan nuevas necesidades, esta página se irá actualizando continuamente.

# About this app
I won't bother (for now) to translate the app and what's above, let me explain why:
This app is made by me for me. My University is in spanish, so if someday I share this code, they are going to need this
in spanish surely, so they can easily understand.

My university does not have an app to help us students to organize our courses and our progress, so I decided to make my
own app. So far, nobody knows about this app in my Uni, maybe someday I tell 'em, I don't know and for now it's not important. Below more info about this version.

In this app, you can organize the path of your "journey" in this career. That means, you can organize in *seasons* what
courses you are going to study at that moment. Also, you will have info about the prerequisites and post requisites of every course. These are the pages you can access and what each one of them does:

- **Inicio (Home):** Here, you will see the courses of the career. If you click a course, you will see the requirements and the courses that needs that course as a requirement. Also, you hava stadistics of your progress.
- **Acerca De (About):** Here, you have more detailed info about this app. As I said above, I won't bother (for now) to translate it, but I hope with the info in english and the video (below this) you have no clue about how this app works.

This app has a login system (not signup), so, if you have an user, you can access to these pages:
- **Mi Ruta (My path):** Here, you can design the path of courses in order to complete the pensum. You have *seasons*, where you can place the courses to study in that *season*. You will see stadistics of the current progress and the stadistics of the path you are designing.
- **Mi Perfil (My Profile):** Here, you can manage the courses, you can mark them as approved or not approved.

Now, this is the detailed video about how this app works:
[https://www.youtube.com/watch?v=2xdFDRr1H6M](https://www.youtube.com/watch?v=2xdFDRr1H6M)
This app has Nuxt.js as frontend, and Supabase as backend, check their sites:
[https://nuxt.com/](https://nuxt.com/)
[https://supabase.com/](https://supabase.com/)


##  1.1 version just arrived (what's new) !!!
In the 1.1 version, you will be able to set and change from admin panel (my-user actually) what courses are approved and what not. If you try to change a course that was previously in a season to approved, you will see a message saying that you cannot change that course to approved unless you delete it from the season that it belongs.

Also, for example, if we open the app in my-route page (panel of seasons) and you have already seasons saved from certain season, (for example, second semester of 2023), and that day that season has already passed (i.e. you open the app in January 2024), you will see an alert telling you that you will no longer be able to access to those seasons and you will have to drop them (you will see the alert, you click something like "ok" and boom, the season or seasons will be deleted).

## What to expect for >1.1 versions?
Actually, nothing. This project, for me, is now finished. This app does what I wanted it to do from the beginning. So, for now, we say goodbye to the development of this application. I want to say that I feel very proud of myself because the biggest app I have ever made for myself. 

I hope this is the guideline for more and better projects, as well as improvements in my development methodology. Wish me luck to graduate and be very good in the field :) (This was written on 10/21/2023, let's see if later when I look at this project again I will be a better web developer, I hope so :) ).

## What NOT to expect for 1.1 version?
(legacy: What NOT to expect for 1.1 version):
There's is a very tiny problem: If you save your progress, the seasonsSlides will return to the first slide, and not where it was. Meh, little bug that can be ignored.

(legacy: What NOT to expect for 1.0 version):
There's not gonna be a signup system. I'm not going to fix the flicking drag-drop problem, because for my needs, its not necessary. It's not gonna be responsive. I'm planning to make (maybe) a mobile app and you'll be able to deploy and use this app there. Also, this app needs a considerable wide screen. >1537px if I'm not wrong.

This app for now is open-source, and if you want to help me or have any idea on how to improve it, get in touch with me o feel free to open a fork (for example, if you know how to fix the flicking problem, because I tried, but I couldn't solve it 😥)
