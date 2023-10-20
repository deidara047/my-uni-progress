# Mi Uni Progress 0.5

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

## Disclaimer:
Soy un desarrollador Junior, por lo que esta página puede tener algunos errores. Conforme vaya yo notando errores o
  surjan nuevas necesidades, esta página se irá actualizando continuamente.

## About this version
I won't bother (for now) to translate what's above, let me explain why:
This app is made by me for me. My University is in spanish, so if someday I share this code, they are going to need this
in spanish surely, so they can easily understand.

My university does not have an app to help us students to organize our courses and our progress, so I decided to make my
own app. So far, nobody knows about this app in my Uni, maybe someday I tell 'em, I don't know and for now it's not important.

###  1.0 version just arrived !!!
Yep, today is the day. We just dropped the 1.0 version. Now you can log in (if you have the account) and save your progress. Supabase as a backend was implemented.

### What to expect for 1.1 version (first final version)?
I deciced to not upload a video explaining the 1.0 version. So I'll be uploading it in the 1.1 version release.
In the 1.1 version, you will be able to set and change from admin panel (my-user actually) what courses are approved and what not. If you try to change a course that was previously in a season to approved, you will see a message saying that you cannot change that course to approved unless you delete it from the season that it belongs.

Also, for example, if we open the app in my-route page (panel of seasons) and you have already seasons saved from certain season, (for example, second semester of 2023), and that day that season has already passed (i.e. you open the app in January 2024), you will see an alert telling you that you will no longer be able to access to those seasons and you will have to drop them (you will see the alert, you click something like "ok" and boom, the season or seasons will be deleted).

### What NOT to expect for 1.1 version (first final version)?
There's is a very tiny problem: If you save your progress, the seasonsSlides will return to the first slide, and not where it was. Meh, little bug that can be ignored.

(legacy: What NOT to expect for 1.0 version (because remains)):
There's not gonna be a signup system. I'm not going to fix the flicking drag-drop problem, because for my needs, its not necessary. It's not gonna be responsive. I'm planning to make (maybe) a mobile app and you'll be able to deploy and use this app there. Also, this app needs a considerable wide screen. >1537px if I'm not wrong.

This app for now is open-source, and if you want to help me or have any idea on how to improve it, get in touch with me o feel free to open a fork (for example, if you know how to fix the flicking problem, because I tried, but I couldn't solve it 😥)