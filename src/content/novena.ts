/**
 * LA LUZ QUE PERMANECE
 * Contenido literal del manuscrito definitivo.
 *
 * Este archivo es la única fuente de texto de la novena.
 * Para corregir una palabra, basta con editarla aquí: todas las páginas se actualizan.
 * Por favor, no modificar el contenido literario sin consultar a su autora.
 */
import type { Block, Day, FinalDay, Section, VerseBlock } from './types'

const p = (text: string): Block => ({ type: 'p', text })
const spoken = (text: string): Block => ({ type: 'spoken', text })

/* ───────────────────────── Portada ───────────────────────── */

export const cover = {
  title: 'LA LUZ QUE PERMANECE',
  subtitle: 'Novena botánica para honrar el amor y abrazar la vida',
  dedication: ['Para María Eugenia Nova', 'Meñita', 'En memoria de Alejandro Franco', 'Medellín · 2026'],
  enter: 'Entrar al jardín',
  tagline: 'Nueve encuentros con la memoria, la gratitud y la luz',
}

/* ───────────────────────── Inicio ───────────────────────── */

export const dedication: Section & { title: string } = {
  title: 'Dedicatoria',
  blocks: [
    p('Para Meñita,'),
    p(
      'Que estas nueve noches sean un pequeño jardín donde descansar el corazón, agradecer el amor compartido y reconocer la luz que siempre ha vivido en ti.',
    ),
    p('Que cada recuerdo encuentre sus raíces y cada nuevo día te reciba con ternura.'),
  ],
}

export const beforeBeginning: Section & { title: string } = {
  title: 'Antes de comenzar',
  blocks: [
    p('Esta novena nace del amor y de la gratitud.'),
    p(
      'No busca poner fin a la tristeza, olvidar a quien amamos ni apresurar el camino del duelo. Es una invitación a recorrer nueve encuentros de memoria, recogimiento y renovación.',
    ),
    p(
      'El nueve es símbolo de culminación y sabiduría. Representa aquello que ha recorrido sus estaciones, ha madurado con el tiempo y se prepara para transformarse sin perder su esencia.',
    ),
    p(
      'Durante estos nueve días, la memoria será nuestra raíz, la gratitud nuestra ofrenda y la luz nuestra compañera.',
    ),
    p(
      'Cada encuentro ofrece una lectura, una oración y un pequeño gesto simbólico. No hay una manera correcta de vivirlos. Habrá momentos para las lágrimas, otros para la sonrisa y algunos en los que bastará permanecer en silencio.',
    ),
    p('La ceremonia puede realizarse de día o de noche, en el momento que resulte más íntimo y tranquilo.'),
    p('Que cada palabra encuentre su propio tiempo.'),
  ],
}

/* ───────────────────────── Preparación del altar ───────────────────────── */

export const altar: Section & { title: string } = {
  title: 'Los elementos del altar',
  blocks: [
    p('Elige un lugar especial de tu hogar donde el altar pueda permanecer dispuesto durante los nueve días.'),
    p('Coloca la pirámide de Alejandro sobre una tela clara, acompañada de:'),
    {
      type: 'list',
      items: [
        'Un velón blanco o marfil, símbolo de la luz que permanece.',
        'Una rama de romero, planta de la memoria y la gratitud.',
        'Una orquídea blanca viva, símbolo de belleza, delicadeza y continuidad.',
        'Una amatista pequeña, piedra asociada en las tradiciones espirituales con la serenidad, la contemplación y la sabiduría interior.',
        'Un cuenco con agua, símbolo de renovación y transformación.',
        'Un pequeño papel y un lápiz, preferiblemente violeta, color de la trascendencia y la transformación espiritual.',
        'Manzanilla para preparar una infusión durante el sexto día.',
      ],
    },
    p(
      'Estos elementos acompañarán toda la novena. No es necesario desmontar ni reorganizar el altar entre un encuentro y otro.',
    ),
  ],
}

/* ───────────────────────── Oración de apertura ───────────────────────── */

export const dailyEncounter: Section & { title: string } = {
  title: 'El encuentro de cada día',
  blocks: [
    p('Acércate al altar con calma.'),
    p('Coloca las manos cerca de la pirámide y respira profundamente tres veces.'),
    p('Enciende el velón y pronuncia:'),
  ],
}

export const openingPrayer: VerseBlock & { title: string } = {
  type: 'verse',
  title: 'Oración de apertura',
  stanzas: [
    [
      'Enciendo esta luz para honrar lo vivido,',
      'para escuchar lo que habita en mi corazón',
      'y recibir con serenidad este momento.',
    ],
  ],
}

export const afterOpening: Block[] = [p('Después, recita la invocación que acompañará los nueve encuentros.')]

/* ───────────────────────── Invocación de las nueve luces ───────────────────────── */

export const invocation: VerseBlock & { title: string } = {
  type: 'verse',
  title: 'Invocación de las nueve luces',
  stanzas: [
    ['Nueve días, nueve noches,', 'nueve encuentros con mi alma.'],
    [
      'Que la memoria eche raíces,',
      'que la gratitud florezca en mi pecho',
      'y que la luz revele',
      'lo que el tiempo ha transformado.',
    ],
    ['Honro los ciclos cumplidos,', 'la sabiduría de lo vivido', 'y el misterio de aquello que permanece.'],
    [
      'Que la ausencia encuentre su lugar,',
      'que el amor siga siendo abrigo',
      'y que mi propia luz',
      'se eleve, serena y viva.',
    ],
    ['Así recibo este día.', 'Así honro este camino.'],
  ],
}

export const afterInvocation: Block[] = [p('Continúa con la lectura, la oración y el gesto de cada día.')]

/* ───────────────────────── Oración de cierre ───────────────────────── */

export const closingIntro: Section & { title: string } = {
  title: 'El cierre de cada encuentro',
  blocks: [
    p(
      'Cuando hayas terminado la lectura, la oración y el gesto correspondiente, regresa tu atención a la llama.',
    ),
    p('Contémplala unos instantes y pronuncia:'),
  ],
}

export const closingPrayer: VerseBlock & { title: string } = {
  type: 'verse',
  title: 'Oración de cierre',
  stanzas: [
    ['Que descanse la llama,', 'que permanezca su luz.', 'Lo que el amor ha sembrado', 'sigue viviendo en mí.'],
  ],
}

export const afterClosing: Block[] = [
  p('Apaga el velón con serenidad, permitiendo que el silencio complete la ceremonia.'),
  p('La luz descansará hasta el siguiente encuentro.'),
]

/** Frase que aparece al apagar la vela digital. */
export const candleRestMessage = 'Que descanse la llama, que permanezca su luz.'

/* ───────────────────────── Las jornadas ───────────────────────── */

export const days: Day[] = [
  {
    number: 1,
    roman: 'I',
    title: 'El umbral',
    subtitle: 'Honrar el amor',
    illustration: 'umbral',
    opening: [p('Comienza con el encendido del velón, la oración de apertura y la invocación de las nueve luces.')],
    reading: [
      p('Hay momentos en que una casa cambia de silencio.'),
      p(
        'Los objetos siguen en su lugar, la luz entra por las mismas ventanas, el mundo continúa con sus pequeñas costumbres. Y, sin embargo, algo esencial ha cambiado.',
      ),
      p('Hoy no vengo a negar ese cambio.'),
      p(
        'Vengo a reconocer la belleza de una historia que tuvo sus propios días, sus estaciones, sus conversaciones y sus silencios.',
      ),
      p(
        'Vengo a honrar la fortuna de haber coincidido en esta vida, de haber construido un nosotros, de haber conocido una forma de amor que dejó huellas en mi manera de mirar el mundo.',
      ),
      p('No necesito encontrar respuestas esta noche.'),
      p('Basta con encender una luz, pronunciar un nombre y permitir que la gratitud se siente junto a la nostalgia.'),
      p('Porque lo que fue verdadero merece un lugar sereno en la memoria.'),
    ],
    prayer: {
      type: 'verse',
      title: 'Oración del umbral',
      stanzas: [
        [
          'Hoy abro este espacio con amor.',
          'Que mi corazón encuentre sosiego,',
          'que mis recuerdos sean recibidos con ternura',
          'y que la gratitud ilumine',
          'el camino que comienza.',
        ],
      ],
    },
    gesture: {
      title: 'Gesto ceremonial',
      blocks: [
        p('Con el velón encendido, toma la rama de romero entre las manos y percibe su aroma.'),
        p('Piensa o pronuncia suavemente el nombre de Alejo.'),
        p('Permanece unos instantes en silencio, reconociendo todo lo que su presencia significó en tu vida.'),
        p('Devuelve el romero al altar.'),
      ],
    },
    closing: [
      p('Para cerrar este primer encuentro, contempla la llama, recita la oración de cierre y apaga el velón.'),
    ],
  },
  {
    number: 2,
    roman: 'II',
    title: 'La memoria viva',
    subtitle: 'Dar gracias por lo compartido',
    illustration: 'memoria',
    opening: [p('Enciende la luz del altar, respira profundamente y recita la oración de apertura y la invocación.')],
    reading: [
      p('La memoria tiene sus propios jardines.'),
      p(
        'Algunos recuerdos llegan como flores abiertas: una tarde luminosa, una conversación inesperada, una risa que todavía parece resonar en alguna habitación.',
      ),
      p(
        'Otros permanecen escondidos, como semillas bajo la tierra, hasta que una palabra, una canción o un aroma los despierta.',
      ),
      p('Hoy quiero recordar sin hacer inventario de lo perdido.'),
      p('Quiero detenerme en la riqueza de lo vivido.'),
      p(
        'En las pequeñas complicidades que nadie más conoció. En los gestos repetidos hasta volverse costumbre. En las historias que solo nosotros habríamos sabido contar de la misma manera.',
      ),
      p('Nada de eso necesita ser perfecto para ser precioso.'),
      p('La gratitud no borra la tristeza, pero puede sentarse a su lado y recordarle que hubo belleza.'),
    ],
    prayer: {
      type: 'verse',
      title: 'Oración de la memoria',
      stanzas: [
        [
          'Gracias por los días compartidos,',
          'por las palabras y los silencios,',
          'por la ternura de lo cotidiano.',
          'Que mis recuerdos no sean cadenas,',
          'sino raíces que me sostengan.',
        ],
      ],
    },
    gesture: {
      title: 'Gesto del día · La ofrenda de romero',
      blocks: [
        p(
          'Toma un pequeño papel y escribe unas palabras de agradecimiento para Alejo. Puede ser por una enseñanza, un recuerdo o algo hermoso que su amor haya dejado en tu vida.',
        ),
        p('Comienza, si lo deseas, con las palabras:'),
        spoken('«Gracias, Alejo, por…»'),
        p('Envuelve una ramita de romero con el papel y colócala debajo de la pirámide.'),
        p('Esta pequeña ofrenda permanecerá allí, guardando su intención, hasta la última jornada.'),
      ],
    },
    closing: [p('Para cerrar, contempla la llama, pronuncia la oración de cierre y apaga el velón.')],
  },
  {
    number: 3,
    roman: 'III',
    title: 'Las manos abiertas',
    subtitle: 'Soltar sin olvidar',
    illustration: 'manos',
    opening: [p('Enciende el velón y recibe este encuentro con la oración de apertura y la invocación.')],
    reading: [
      p('Hay cosas que las manos quisieran retener para siempre.'),
      p(
        'Una voz, una mirada, el peso familiar de un abrazo. Hay instantes que quisiéramos guardar intactos, a salvo del tiempo y de sus transformaciones.',
      ),
      p('Pero las manos también fueron hechas para abrirse.'),
      p('Abrirse no significa renunciar al amor. Significa reconocer que no todo puede permanecer de la misma manera.'),
      p(
        'Quizá soltar sea dejar de pedirle al pasado que regrese y comenzar a permitirle que nos acompañe desde otro lugar.',
      ),
      p('Hoy puedo extrañar sin reprocharme la tristeza.'),
      p('Puedo recordar sin aferrarme a cada imagen.'),
      p('Puedo amar profundamente y, aun así, dejar espacio para lo que todavía no conozco.'),
      p('No hay olvido en ese gesto.'),
      p('Hay una forma nueva de ternura.'),
    ],
    prayer: {
      type: 'verse',
      title: 'Oración de las manos abiertas',
      stanzas: [
        [
          'Que mis manos aprendan a descansar.',
          'Que pueda conservar el amor',
          'sin aferrarme al dolor.',
          'Que encuentre serenidad',
          'en aquello que no puedo cambiar',
          'y libertad para abrazar lo que vendrá.',
        ],
      ],
    },
    gesture: {
      title: 'Gesto del día',
      blocks: [
        p('Sostén la amatista con ambas manos cerradas.'),
        p('Respira lentamente y, cuando te sientas preparada, abre las palmas.'),
        p('Contempla la piedra durante unos instantes.'),
        p('No necesitas dejarla ir. Solo reconocer que también puedes sostener aquello que amas con las manos abiertas.'),
      ],
    },
    closing: [
      p('Para cerrar, devuelve la amatista a su lugar, recita la oración de cierre y deja descansar la llama.'),
    ],
  },
  {
    number: 4,
    roman: 'IV',
    title: 'La casa interior',
    subtitle: 'Habitar mi propio espacio',
    illustration: 'casa',
    opening: [p('Enciende el velón y pronuncia la oración de apertura y la invocación.')],
    reading: [
      p('Después de tantos años de compartir la vida, hasta el silencio parece tener una forma conocida.'),
      p('Hay una silla, una mesa, una hora del día que conserva la costumbre de dos.'),
      p('Y aprender a habitar esos espacios de otra manera puede ser una de las tareas más delicadas del corazón.'),
      p('Hoy no necesito llenar cada vacío.'),
      p('Puedo permitir que la casa respire.'),
      p(
        'Puedo cambiar de lugar una flor, abrir una ventana, sentarme donde antes no me sentaba y descubrir que también tengo derecho a transformar mi entorno.',
      ),
      p('Mi hogar guarda una historia, pero sigue siendo un lugar vivo.'),
      p('Y yo también.'),
      p(
        'Dentro de mí existe una casa que no ha perdido sus cimientos. Una casa hecha de experiencias, afectos, deseos y una voz propia que todavía tiene mucho por decir.',
      ),
    ],
    prayer: {
      type: 'verse',
      title: 'Oración de la casa interior',
      stanzas: [
        [
          'Que encuentre paz en mi propio espacio.',
          'Que el silencio no sea solamente ausencia,',
          'sino también descanso y posibilidad.',
          'Que vuelva a reconocer mi voz',
          'y a sentirme en casa dentro de mí.',
        ],
      ],
    },
    gesture: {
      title: 'Gesto del día',
      blocks: [
        p('Cambia el agua del cuenco y colócalo nuevamente junto a la pirámide.'),
        p('Sostén la amatista entre las manos y contempla por unos instantes el altar.'),
        p('Piensa en un pequeño espacio de tu hogar que quieras dedicar a tu propia tranquilidad.'),
        p(
          'No necesitas transformarlo hoy; basta con reconocer que también hay lugares que pueden pertenecer únicamente a tu descanso.',
        ),
      ],
    },
    closing: [p('Para cerrar, devuelve la amatista al altar, pronuncia la oración de cierre y apaga el velón.')],
  },
  {
    number: 5,
    roman: 'V',
    title: 'Las raíces invisibles',
    subtitle: 'Reconocer lo que permanece',
    illustration: 'raices',
    opening: [p('Enciende la luz, respira y recita la oración de apertura y la invocación.')],
    reading: [
      p('Las raíces trabajan en silencio.'),
      p('No necesitan mostrarse para sostener un árbol, ni reclamar su lugar para alimentar las ramas.'),
      p('Así sucede también con aquello que el amor deja en nosotros.'),
      p(
        'Hay maneras de hablar, de cuidar, de celebrar, de mirar la vida que nacieron en el encuentro con alguien más y que, con el tiempo, se volvieron parte de nuestra propia naturaleza.',
      ),
      p('Lo compartido no permanece solamente en las fotografías.'),
      p('Vive en lo aprendido, en las decisiones que tomamos, en la sensibilidad que cultivamos juntos.'),
      p('Hoy puedo reconocer esas raíces sin sentir que debo quedarme inmóvil junto a ellas.'),
      p('Porque las raíces no existen para impedir el crecimiento.'),
      p('Existen para hacerlo posible.'),
    ],
    prayer: {
      type: 'verse',
      title: 'Oración de las raíces',
      stanzas: [
        [
          'Que la memoria sea raíz.',
          'Que lo aprendido me sostenga,',
          'que la ternura siga dando frutos',
          'y que todo el amor recibido',
          'encuentre nuevas formas de vivir en mí.',
        ],
      ],
    },
    gesture: {
      title: 'Gesto del día',
      blocks: [
        p(
          'Retira delicadamente de debajo de la pirámide la pequeña ofrenda de romero que preparaste el segundo día.',
        ),
        p('Sostenla entre tus manos, respira su aroma y recuerda algo valioso que aprendiste junto a Alejo.'),
        p('Agradece esa enseñanza y reconoce cómo sigue formando parte de ti.'),
        p('No necesitas abrir el papel ni volver a leer sus palabras.'),
        p('Cuando sientas que el recuerdo ha encontrado su lugar, devuelve la ofrenda debajo de la pirámide.'),
      ],
    },
    closing: [p('Para cerrar, recita la oración de cierre y apaga el velón.')],
  },
  {
    number: 6,
    roman: 'VI',
    title: 'El permiso de la alegría',
    subtitle: 'Recibir nuevamente lo hermoso',
    illustration: 'alegria',
    opening: [p('Enciende el velón y comienza con la oración de apertura y la invocación.')],
    reading: [
      p('Hay días en que la alegría regresa sin anunciarse.'),
      p('Entra por una ventana abierta, por el aroma del café, por una conversación que termina en risa.'),
      p(
        'Y a veces, después de reír, llega una pequeña tristeza, como si la felicidad necesitara pedir perdón por haber vuelto.',
      ),
      p('Pero el amor verdadero nunca nos pidió renunciar a la vida.'),
      p(
        'Quizá una de sus formas más generosas de permanecer sea precisamente esa: dejarnos descubrir que todavía hay belleza esperándonos, que aún podemos maravillarnos, que la risa no borra ningún recuerdo.',
      ),
      p('Que la luz que hoy entra en mi casa encuentre las puertas abiertas.'),
      p('Que pueda recibirla sin culpa.'),
      p('Y que cada nueva alegría lleve consigo, sin pesar, la gratitud de haber amado.'),
    ],
    prayer: {
      type: 'verse',
      title: 'Oración de la alegría',
      stanzas: [
        [
          'Hoy me permito recibir lo hermoso.',
          'Que la risa vuelva a encontrarme,',
          'que la belleza no me resulte ajena,',
          'que cada instante de felicidad',
          'sea también una forma de agradecer.',
          'No necesito olvidar para volver a sonreír.',
        ],
      ],
    },
    gesture: {
      title: 'Gesto del día',
      blocks: [
        p('Prepara una infusión de manzanilla y llévala al altar.'),
        p('Sostén la taza tibia entre las manos, percibe su aroma y recuerda un momento feliz con Alejo.'),
        p('Permítete sonreír, si la sonrisa llega.'),
        p('Bebe lentamente, como quien recibe un pequeño regalo de la vida.'),
      ],
    },
    closing: [p('Para cerrar, deja reposar la taza, pronuncia la oración de cierre y apaga el velón.')],
  },
  {
    number: 7,
    roman: 'VII',
    title: 'La mujer que permanece',
    subtitle: 'Reconocer mi propia luz',
    illustration: 'mujer',
    opening: [p('Enciende la luz del altar y pronuncia la oración de apertura y la invocación.')],
    reading: [
      p('Antes de todos los encuentros, ya había una historia en mí.'),
      p(
        'Una niña que imaginaba el mundo. Una joven que aprendía a elegir sus caminos. Una mujer que fue descubriendo su fuerza, sus contradicciones, sus sueños.',
      ),
      p('El amor compartido enriqueció esa historia, pero nunca fue su única página.'),
      p('Hoy quiero recordar que sigo siendo una mujer entera, incluso cuando una parte de mi vida ha cambiado para siempre.'),
      p('Mis deseos todavía tienen voz.'),
      p('Mi curiosidad sigue viva.'),
      p(
        'Hay cosas que aún puedo aprender, lugares que puedo conocer, amistades que puedo cultivar y pequeñas aventuras que esperan su momento.',
      ),
      p('No tengo que convertirme en alguien distinta para continuar.'),
      p('Solo necesito darme permiso para seguir descubriendo quién soy.'),
    ],
    prayer: {
      type: 'verse',
      title: 'Oración de mi propia luz',
      stanzas: [
        [
          'Que pueda mirarme con ternura.',
          'Que reconozca mi fuerza',
          'sin exigirme ser fuerte cada día.',
          'Que mi voz, mis sueños y mis deseos',
          'encuentren espacio para crecer.',
          'Que nunca olvide',
          'la luz que también nace de mí.',
        ],
      ],
    },
    gesture: {
      title: 'Gesto del día',
      blocks: [
        p('Sostén la amatista entre las manos, junto a la luz del altar.'),
        p(
          'Recuerda tres cualidades que te han acompañado a lo largo de tu vida: aquellas que te han permitido amar, superar dificultades, crear belleza o cuidar de quienes quieres.',
        ),
        p('Elige una de ellas y pronúnciala en voz alta, comenzando con las palabras:'),
        spoken('«Reconozco en mí…»'),
        p('Deja que esa palabra permanezca unos instantes en el silencio.'),
      ],
    },
    closing: [p('Para cerrar, devuelve la amatista al altar, recita la oración de cierre y apaga el velón.')],
  },
  {
    number: 8,
    roman: 'VIII',
    title: 'El jardín de lo vivido',
    subtitle: 'Cosechar la belleza de cada estación',
    illustration: 'jardin',
    opening: [p('Enciende el velón, respira profundamente y pronuncia la oración de apertura y la invocación.')],
    reading: [
      p('Hay jardines cuya belleza no está en las primeras flores, sino en la profundidad de sus raíces.'),
      p(
        'Jardines que han conocido el sol intenso, las lluvias largas, los inviernos silenciosos. Que han perdido algunas ramas y, sin embargo, conservan la generosidad de ofrecer sombra, perfume y frutos.',
      ),
      p('También la vida tiene sus estaciones.'),
      p(
        'Llega un tiempo en que ya no necesitamos correr detrás de cada horizonte. Podemos detenernos, contemplar lo recorrido y descubrir la riqueza de aquello que hemos cultivado.',
      ),
      p(
        'Hay una sabiduría que solo nace de los años vividos, de los amores entregados, de las pérdidas atravesadas y de las alegrías que aprendimos a reconocer.',
      ),
      p('Hoy quiero honrar esa abundancia.'),
      p('No todo lo hermoso está por comenzar.'),
      p('Mucho de lo hermoso ya vive en mí.'),
      p(
        'Y todavía quedan tardes para disfrutarlo, manos para compartirlo, paisajes para contemplar y frutos que recoger.',
      ),
    ],
    prayer: {
      type: 'verse',
      title: 'Oración de la cosecha',
      stanzas: [
        [
          'Que sepa reconocer la abundancia',
          'de todo cuanto he vivido.',
          'Que mis días encuentren sosiego,',
          'que mis manos reciban los frutos',
          'de tantos años de amor y aprendizaje.',
          'Y que nunca me falte la capacidad',
          'de descubrir belleza en una nueva mañana.',
        ],
      ],
    },
    gesture: {
      title: 'Gesto del día',
      blocks: [
        p('Contempla la orquídea blanca y viva que ha acompañado el altar desde el primer día.'),
        p(
          'Observa sus flores, sus raíces, sus pequeñas imperfecciones. Si necesita algún cuidado, ofréceselo con delicadeza.',
        ),
        p('Mientras lo haces, recuerda algo hermoso que la vida te ha permitido cultivar y que aún disfrutas.'),
      ],
    },
    closing: [p('Para cerrar, contempla la llama, recita la oración de cierre y apaga el velón.')],
  },
]

/* ───────────────────────── Día IX · Ceremonia lunar ───────────────────────── */

export const finalDay: FinalDay = {
  number: 9,
  roman: 'IX',
  title: 'La luz que continúa',
  subtitle: 'Bendecir la vida bajo la luna llena',
  illustration: 'luna',
  opening: {
    title: 'La apertura de la última jornada',
    blocks: [
      p('Acércate al altar que te ha acompañado durante estos nueve encuentros.'),
      p(
        'Contempla sus elementos: la pirámide, la orquídea viva, la amatista, el romero con su pequeña ofrenda, el agua y el velón.',
      ),
      p('Respira profundamente tres veces.'),
      p(
        'Enciende la llama y pronuncia, por última vez en esta novena, la oración de apertura y la invocación de las nueve luces.',
      ),
      p('Permanece unos instantes en silencio antes de comenzar la lectura.'),
    ],
  },
  reading: {
    title: 'Lectura final',
    blocks: [
      p('Esta noche no termina el amor.'),
      p('Tampoco termina la nostalgia, ni el camino paciente de aprender a vivir con aquello que ha cambiado.'),
      p('Esta noche termina solamente un pequeño recorrido de nueve encuentros conmigo misma.'),
      p(
        'He abierto la puerta a mis recuerdos. He reconocido mis raíces, mis silencios, mi fortaleza y la posibilidad de volver a sentir alegría.',
      ),
      p('Ahora levanto la mirada hacia la luna.'),
      p('Su luz no me pide olvidar la oscuridad. Me recuerda que ambas forman parte del mismo cielo.'),
      p('Puedo agradecer lo vivido sin permanecer detenida en él.'),
      p('Puedo llevar conmigo una historia de amor y seguir escribiendo la mía.'),
      p('Que la memoria sea tierra fértil.'),
      p('Que el amor conserve su lugar.'),
      p('Que mis días sigan abiertos a la belleza, al asombro y a la vida.'),
      p('Y que, cuando vuelva a mirar la luna, recuerde que dentro de mí también hay luz.'),
    ],
  },
  blessing: {
    type: 'verse',
    title: 'Bendición final',
    stanzas: [
      ['Bendigo el amor que compartimos,', 'los días que nos fueron concedidos', 'y las huellas que permanecen.'],
      ['Bendigo mis manos,', 'que todavía pueden crear y ofrecer ternura.'],
      ['Bendigo mis pasos,', 'que todavía pueden descubrir caminos.'],
      ['Bendigo mi corazón,', 'que puede guardar un gran amor', 'y seguir abriéndose a la vida.'],
      [
        'Que la memoria sea raíz,',
        'que la ausencia se transforme en fortaleza',
        'y que mi propia luz encuentre',
        'nuevas formas de florecer.',
      ],
    ],
  },
  gestureTitle: 'Gesto ceremonial · La transformación',
  moments: {
    ofrenda: {
      title: 'La ofrenda de romero',
      blocks: [
        p('Retira de debajo de la pirámide la pequeña ofrenda que ha acompañado estas nueve jornadas.'),
        p('Sostenla entre las manos.'),
        p(
          'Recuerda las palabras de agradecimiento que escribiste el segundo día. No necesitas volver a leerlas. Ya forman parte de tu memoria.',
        ),
        p('Separa delicadamente el papel del romero, sin desplegarlo.'),
        p('Conserva la rama en el altar.'),
      ],
    },
    fuegoAgua: {
      title: 'El fuego y el agua',
      blocks: [
        p('Acerca el pequeño papel a la llama del velón y permite que el fuego comience a consumirlo.'),
        p(
          'Deposítalo en el cuenco con agua para extinguir la llama, dejando que el agua reciba aquello que el fuego ha transformado.',
        ),
        p('Mientras realizas el gesto, pronuncia:'),
        {
          type: 'verse',
          stanzas: [
            [
              'Lo que agradezco permanece.',
              'Lo que entrego se transforma.',
              'Que el fuego lleve mi gratitud',
              'y el agua reciba, en paz,',
              'aquello que hoy dejo ir.',
            ],
          ],
        },
        p('Contempla el agua unos instantes.'),
        p('El papel ha cumplido su propósito. El romero permanece.'),
      ],
    },
    luna: {
      title: 'La bendición de la luna',
      blocks: [
        p('La luna llena acompaña el cierre de esta novena como símbolo de plenitud, sabiduría y transformación.'),
        p(
          'Lleva la pirámide a un lugar donde pueda recibir su luz: un balcón, un jardín o una ventana abierta al cielo.',
        ),
        p('Puedes dejarla bajo la luna durante la noche y devolverla a su lugar al amanecer.'),
        p('Coloca tus manos alrededor de la pirámide y contempla la claridad lunar.'),
        p('Imagina que su luz abraza la memoria de lo vivido y bendice los caminos que continúan.'),
        p('Sostén la amatista entre las manos.'),
        p('Agradece en silencio algo de tu historia con Alejo.'),
        p(
          'Después, ofrece una bendición para ti misma: una palabra, un deseo, una intención que quieras llevar contigo más allá de estas nueve jornadas.',
        ),
      ],
    },
  },
  lastLight: {
    title: 'La última luz',
    blocks: [
      p('Regresa al altar y contempla el velón encendido.'),
      p('Pronuncia lentamente:'),
      {
        type: 'verse',
        stanzas: [
          ['Que descanse la llama,', 'que permanezca su luz.', 'Lo que el amor ha sembrado', 'sigue viviendo en mí.'],
        ],
      },
      p('Apaga el velón.'),
      p('La ceremonia ha terminado.'),
      p('El amor y la vida continúan.'),
    ],
  },
}

/* ───────────────────────── Lo que aún florece ───────────────────────── */

export const stillBlooming = {
  title: 'LO QUE AÚN FLORECE',
  subtitle: 'Un espacio para mis propias palabras',
  blocks: [
    p('Hay recuerdos que quiero conservar.'),
    p('Hay cosas que estoy aprendiendo.'),
    p('Hay alegrías que todavía me esperan.'),
    p('Y hay una vida, la mía, que aún tiene belleza para ofrecer, recibir y celebrar.'),
    {
      type: 'verse',
      stanzas: [['Que la memoria sea raíz,', 'que el amor conserve su lugar', 'y que mi luz siga floreciendo.']],
    },
  ] as Block[],
  signature: ['Para María Eugenia Nova, con amor.', 'Medellín · 2026'],
}
