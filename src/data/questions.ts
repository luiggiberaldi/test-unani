import { Question, Biotype } from '../types';

type CsvQ = [string, string, string, string, [string, Biotype], [string, Biotype], [string, Biotype], [string, Biotype]];

const rawM1: CsvQ[] = [
  ['m1_1', 'opcion_unica', 'Proporción torso vs extremidades', '', ['Torso corto, extremidades largas (angular)', 'colerico'], ['Redondeado o suave, poca definición', 'flematico'], ['Denso, proporcionado, fuerte', 'sanguineo'], ['Alargado, fino, sin mucha curva', 'melancolico']],
  ['m1_2', 'opcion_unica', 'Sensación general del cuerpo', '', ['Fuerte, tenso, preparado para la acción', 'colerico'], ['Pesado, relajado, tendiendo a la retención', 'flematico'], ['Compacto, ágil, enraizado', 'sanguineo'], ['Liviano, delicado, a veces frágil', 'melancolico']],
  ['m1_3', 'opcion_unica', 'Facilidad para ganar músculo (sin esfuerzo sostenido)', '', ['Naturalmente defino el músculo rápido', 'colerico'], ['Me cuesta mucho, tiendo a ganar peso blando', 'flematico'], ['Gano músculo muy fácilmente, soy de contextura ancha', 'sanguineo'], ['Me cuesta mucho, siempre he sido de contextura delgada', 'melancolico']],
  ['m1_4', 'opcion_unica', 'Facilidad para retener líquidos', '', ['Casi nunca, mi piel es firme y seca', 'colerico'], ['Constantemente, me siento hinchado/a con facilidad', 'flematico'], ['A veces, sobre todo si hace mucho calor', 'sanguineo'], ['Pocas veces, mi problema es la sequedad', 'melancolico']],
  ['m1_5', 'opcion_unica', 'Dónde acumulas grasa primero', '', ['En todo el cuerpo por igual o grasa visceral', 'colerico'], ['Bajo la piel, caderas, glúteos, muslos', 'flematico'], ['En el abdomen superior y pecho', 'sanguineo'], ['Casi no acumulo o lo hago solo en el bajo abdomen', 'melancolico']],
  ['m1_6', 'opcion_unica', 'Tamaño de las manos', '', ['Medianamente grandes, dedos angulares', 'colerico'], ['Pequeñas, dedos redondeados o carnosos', 'flematico'], ['Grandes, cálidas, palmas anchas', 'sanguineo'], ['Largas, dedos muy finos, frías', 'melancolico']],
  ['m1_7', 'opcion_unica', 'Percepción de densidad ósea', '', ['Huesos medianos pero fuertes', 'colerico'], ['Huesos pequeños o no se notan bajo la piel', 'flematico'], ['Esqueleto ancho y pesado', 'sanguineo'], ['Esqueleto muy liviano, nudillos prominentes', 'melancolico']],
  ['m1_8', 'opcion_unica', 'Forma natural del rostro', '', ['Triangular o con mandíbula muy marcada', 'colerico'], ['Redondeado, cachetes suaves', 'flematico'], ['Cuadrado, base sólida', 'sanguineo'], ['Alargado, hundido, frente alta', 'melancolico']],
  ['m1_9', 'opcion_unica', 'Estructura mandibular', '', ['Muy afilada y marcada', 'colerico'], ['Suave e imperceptible', 'flematico'], ['Fuerte y ancha', 'sanguineo'], ['Delicada y fina', 'melancolico']],
  ['m1_10', 'opcion_unica', 'Tipo de mirada/ojos', '', ['Intensa, directa, penetrante', 'colerico'], ['Grandes, húmedos, tiernos', 'flematico'], ['Vivaces, móviles, magnéticos', 'sanguineo'], ['Profundos, serios, como si miraran más allá', 'melancolico']],
  ['m1_11', 'opcion_unica', 'Textura de piel', '', ['Seca y muy caliente', 'colerico'], ['Húmeda y fría', 'flematico'], ['Húmeda y caliente', 'sanguineo'], ['Seca, fina y fría', 'melancolico']],
  ['m1_12', 'opcion_unica', 'Temperatura corporal percibida habitualmente', '', ['Siempre tengo calor', 'colerico'], ['Casi siempre tengo frío interior', 'flematico'], ['Soy caluroso pero sudo para regularme', 'sanguineo'], ['Tengo los pies y manos fríos constantemente', 'melancolico']],
  ['m1_13', 'opcion_unica', 'Tendencia a sudar', '', ['Poco, siento el calor pero no sudo tanto', 'colerico'], ['Casi nada', 'flematico'], ['Mucho, sobre todo al moverme o interactuar', 'sanguineo'], ['Poco, solo un sudor frío si me estreso', 'melancolico']],
  ['m1_14', 'opcion_unica', 'Cantidad de vello corporal', '', ['Mucho, tiende a ser grueso', 'colerico'], ['Poco, fino y claro', 'flematico'], ['Abundante y oscuro', 'sanguineo'], ['Moderado a poco, irregular', 'melancolico']],
  ['m1_15', 'opcion_unica', 'Cambios en tu cuerpo bajo estrés sostenido', '', ['Me tenso mucho pero mi peso se mantiene o baja un poco', 'colerico'], ['Tiendo a retener líquidos o ganar peso, me hincho', 'flematico'], ['Depende, pero suelo comer más', 'sanguineo'], ['Pierdo peso rápidamente, pierdo el apetito', 'melancolico']],
  ['m1_16', 'opcion_unica', 'Tu complexión en la pubertad / adolescencia temprana', '', ['Atlética sin hacer esfuerzo', 'colerico'], ['Rellenita o tendiente a ganar peso', 'flematico'], ['Fuerte, desarrollada rápido', 'sanguineo'], ['Elegante o muy delgada, estirada', 'melancolico']],
  ['m1_17', 'comparativa', '¿En reposo tu cuerpo se calienta o se enfría?', '', ['Guarda mucho calor', 'colerico'], ['Se enfría y necesito abrigo', 'flematico'], ['Se relaja y suda', 'sanguineo'], ['Se vuelve rígido y frío', 'melancolico']],
  ['m1_18', 'comparativa', 'Reacción rápida', '', ['Mucha tensión muscular en la mandíbula o cuello', 'colerico'], ['Bajo nivel de energía en el cuerpo', 'flematico'], ['Gesticulación amplia con los brazos', 'sanguineo'], ['Tensión en la base del cráneo y ojos secos', 'melancolico']],
];

const rawM2: CsvQ[] = [
  ['m2_1', 'opcion_unica', 'Tolerancia al calor intenso', '', ['Lo aguanto bien pero a veces me enoja', 'colerico'], ['Lo sufro mucho, me agota', 'flematico'], ['No me molesta tanto, sudo y me muevo', 'sanguineo'], ['Me seca la piel y me frustra, prefiero el clima fresco', 'melancolico']],
  ['m2_2', 'opcion_unica', 'Tolerancia al frío', '', ['No me afecta casi nada, ando en remera en invierno', 'colerico'], ['Me resulta terrible, necesito estar muy abrigado/a', 'flematico'], ['Lo tolero si estoy activo, pero me gusta más el calor', 'sanguineo'], ['El frío me duele en los huesos y articulaciones', 'melancolico']],
  ['m2_3', 'opcion_unica', 'Reacción al aire acondicionado continuo', '', ['Lo disfruto', 'colerico'], ['Me hace sentir mal o me resfrío fácil', 'flematico'], ['Me da igual si estoy entretenido/a', 'sanguineo'], ['Siento que me seca las vías respiratorias y articulaciones', 'melancolico']],
  ['m2_4', 'opcion_unica', 'Necesidad de abrigo', '', ['Siempre tengo menos ropa que el resto', 'colerico'], ['Siempre soy el primero en taparme', 'flematico'], ['Promedio, aunque varío mucho', 'sanguineo'], ['Siempre tengo frío en manos y pies, uso varias capas', 'melancolico']],
  ['m2_5', 'opcion_unica', 'Energía en clima húmedo', '', ['Me da más calor y rabia', 'colerico'], ['Me siento aplastado, pesado', 'flematico'], ['Sudo muchísimo pero funciono', 'sanguineo'], ['Odio la humedad, siento que no puedo respirar', 'melancolico']],
  ['m2_6', 'opcion_unica', 'Sensibilidad digestiva regular', '', ['A veces acidez o gastritis al estresarme', 'colerico'], ['Digestión muy lenta, pesadez habitual', 'flematico'], ['Digiero cualquier cosa sin problema', 'sanguineo'], ['Intestino muy sensible (irritable), gases o dolor con el estrés', 'melancolico']],
  ['m2_7', 'opcion_unica', 'Patrón de sueño', '', ['Duermo poco pero me levanto como nuevo', 'colerico'], ['Duermo muchas horas, me cuesta arrancar', 'flematico'], ['Duermo irregular y me acuesto tarde', 'sanguineo'], ['Me cuesta conciliar el sueño o me despierto pensando', 'melancolico']],
  ['m2_8', 'opcion_unica', 'Tendencia a contracturas', '', ['Sí, hombros y cuello fijos como piedra', 'colerico'], ['Poco, suelo estar bastante flojo', 'flematico'], ['A veces en la espalda baja u hombros', 'sanguineo'], ['Sí, dolores erráticos y tensionales en varios lados', 'melancolico']],
  ['m2_9', 'opcion_unica', 'Somatización del estrés principal', '', ['Cabeza (migrañas)', 'colerico'], ['Estómago (pesadez)', 'flematico'], ['Pecho o palpitaciones', 'sanguineo'], ['Intestino o dolores nerviosos continuos', 'melancolico']],
  ['m2_10', 'opcion_unica', 'Pico de energía en el día', '', ['En cuanto amanece, salto de la cama', 'colerico'], ['Nunca tengo un pico real, voy lento', 'flematico'], ['Por la tarde/noche, me enciendo si hay gente', 'sanguineo'], ['En la madrugada, cuando todos duermen', 'melancolico']],
  ['m2_11', 'opcion_unica', 'Reacción ante ruidos fuertes repentinos', '', ['Me enojan o me ponen a la defensiva', 'colerico'], ['Me asustan y trato de evitarlos', 'flematico'], ['Los noto y reacciono de manera curiosa o habladora', 'sanguineo'], ['Me alteran muchísimo los nervios y me agotan el foco', 'melancolico']],
  ['m2_12', 'opcion_unica', 'Sensibilidad al dolor físico', '', ['Tolerancia alta, sigo adelante aunque me duela', 'colerico'], ['Lo sufro en silencio y lloro a solas', 'flematico'], ['Me quejo en voz alta, pero se me pasa pronto', 'sanguineo'], ['Lo analizo demasiado y aumenta mi ansiedad', 'melancolico']],
];

const rawM3: CsvQ[] = [
  ['m3_1', 'opcion_unica', 'Velocidad de decisión importante', '', ['Rápida, actúo y luego ajusto', 'colerico'], ['Muy lenta, consulto a otros, dudo mucho', 'flematico'], ['Impulsiva, lo decido por cómo me siento en el momento', 'sanguineo'], ['Ultra analítica, veo todos los escenarios antes de actuar', 'melancolico']],
  ['m3_2', 'opcion_unica', 'Liderazgo grupal', '', ['Tomo el mando si nadie lo hace', 'colerico'], ['Prefiero apoyar desde atrás o escuchar', 'flematico'], ['Termino siendo el centro por carisma', 'sanguineo'], ['Aporto datos y estrategia, no me interesa la atención pública', 'melancolico']],
  ['m3_3', 'opcion_unica', 'Relación con el orden', '', ['Mi escritorio sirve, el orden es mi herramienta', 'colerico'], ['Tiendo a acumular cosas por afecto', 'flematico'], ['Caos total, no encuentro nada pero funciono', 'sanguineo'], ['Todo tiene su lugar exacto, no tolero el desorden', 'melancolico']],
  ['m3_4', 'opcion_unica', 'Tolerancia a imprevistos', '', ['Los resuelvo sobre la marcha, me estimulan', 'colerico'], ['Me paralizan, busco contención', 'flematico'], ['Excelente, improviso genial', 'sanguineo'], ['Me irritan en extremo, odio que cambien mis planes', 'melancolico']],
  ['m3_5', 'opcion_unica', 'Ritmo de trabajo', '', ['Explosivo, enfocado por rachas y luego pausa breve', 'colerico'], ['Lento, sostenido y rutinario, sin estrés', 'flematico'], ['Variable, dependiente del estímulo del entorno', 'sanguineo'], ['Profundo, minucioso, no paro hasta que esté perfecto', 'melancolico']],
  ['m3_6', 'opcion_unica', 'Cómo inicias una tarea', '', ['De inmediato, paso a la acción directa', 'colerico'], ['Pospongo bastante hasta que me alientan', 'flematico'], ['Empiezo varias cosas a la vez, dejo de lado la más aburrida', 'sanguineo'], ['Preparo todo detalladamente antes de dar el primer paso', 'melancolico']],
  ['m3_7', 'opcion_unica', 'Constancia en proyectos largos', '', ['Sostengo si soy yo el líder o tengo el control', 'colerico'], ['Sostengo muy bien si hay paz, no me rindo por inercia', 'flematico'], ['Es mi punto débil, me aburro y necesito novedad', 'sanguineo'], ['Soy muy tenaz y constante si tiene sentido profundo', 'melancolico']],
  ['m3_8', 'opcion_unica', 'Comportamiento bajo presión', '', ['Me vuelvo eficiente e implacable', 'colerico'], ['Me refugio, me escondo o cedo ante la presión', 'flematico'], ['La sorteo con humor u optimismo, escapando del peso', 'sanguineo'], ['Me paraliza el miedo al error, pero nunca lo demuestro', 'melancolico']],
  ['m3_9', 'opcion_unica', 'Frente a un gran obstáculo', '', ['Lo atravieso cueste lo que cueste', 'colerico'], ['Espero a ver si se resuelve solo o busco ayuda afectuosa', 'flematico'], ['Pido favores, activo contactos, lo esquivo creativamente', 'sanguineo'], ['Hago listas, investigo el obstáculo a profundidad para entenderlo', 'melancolico']],
  ['m3_10', 'opcion_unica', 'Motivación principal', '', ['Conseguir objetivos o resultados tangibles', 'colerico'], ['Mantener la armonía y conectar con otros', 'flematico'], ['Vivir experiencias nuevas y divertidas', 'sanguineo'], ['Alcanzar la perfección o la verdad, aprender', 'melancolico']],
  ['m3_11', 'escala', 'Tomo la iniciativa sin que me lo pidan', '', ['Casi siempre', 'colerico'], ['Casi nunca', 'flematico'], ['A menudo', 'sanguineo'], ['Solo bajo certeza absoluta', 'melancolico']],
  ['m3_12', 'escala', '¿Sueles dejar cosas sin terminar?', '', ['Nunca, si empiezo, termino', 'colerico'], ['Depende de la quietud externa', 'flematico'], ['Muchísimo, mi historial de proyectos en pausa es largo', 'sanguineo'], ['Si no es perfecto, a veces prefiero borrarlo', 'melancolico']],
  ['m3_13', 'comparativa', '¿Foco o multitarea?', '', ['Termino algo y paso a lo siguiente de forma implacable', 'colerico'], ['Me tomo mi tiempo, una actividad sostenida y lenta', 'flematico'], ['Multiples pestañas abiertas, picoteo aquí y allá', 'sanguineo'], ['Me obsesiono con una sola cosa por días ignorando el resto', 'melancolico']],
  ['m3_14', 'comparativa', 'Mi energía se activa más con:', '', ['Desafíos e hitos', 'colerico'], ['Quietud, música suave, ambiente conocido', 'flematico'], ['Gente, bromas, interacción social ruidosa', 'sanguineo'], ['Soledad, una biblioteca, silencio mental profundo', 'melancolico']],
];

const rawM4: CsvQ[] = [
  ['m4_1', 'opcion_unica', 'Expresión emocional', '', ['Expreso mi enojo, lo demás lo oculto para no mostrar debilidad', 'colerico'], ['No expreso hasta que es demasiado, guardo todo y me resiento', 'flematico'], ['Vivo con el corazón en la mano, digo todo inmediatamente', 'sanguineo'], ['Soy muy cuidadoso, la expreso a muy pocos y a puerta cerrada', 'melancolico']],
  ['m4_2', 'opcion_unica', 'Profundidad de la emoción', '', ['La acción me saca rápido de la emoción', 'colerico'], ['Siento como un lago profundo y silencioso que nunca remite', 'flematico'], ['Vivo las cosas como fuegos artificiales, pasan pronto', 'sanguineo'], ['Caigo en pozos emocionales profundos de los que me cuesta salir', 'melancolico']],
  ['m4_3', 'opcion_unica', 'Sensibilidad al rechazo', '', ['No me importa, prefiero que me teman o me sigan a que me quieran', 'colerico'], ['Me destruye secretamente, hago todo para que no se enojen', 'flematico'], ['Me choca, quiero caer bien, pero se me olvida en un rato', 'sanguineo'], ['Me afecta muchísimo, lo recuerdo por años y repudio secretamente', 'melancolico']],
  ['m4_4', 'opcion_unica', 'Necesidad de validación', '', ['Busco que reconozcan mi eficacia y resultados', 'colerico'], ['Solo necesito que me mimen o me digan que estoy bien', 'flematico'], ['Necesito aplauso o risas, saber que soy el alma del lugar', 'sanguineo'], ['Busco que entiendan mi pensamiento o valoren mi dedicación perfecta', 'melancolico']],
  ['m4_5', 'opcion_unica', 'Manejo del dolor / herida', '', ['Me vuelvo más duro, distante y frío', 'colerico'], ['Me pongo en modo víctima pasivo, lloro', 'flematico'], ['Busco amigos para olvidarme y taparlo', 'sanguineo'], ['Me asilo totalmente de la sociedad, lo lloro amargamente en solitario', 'melancolico']],
  ['m4_6', 'opcion_unica', 'Rencor vs Perdón', '', ['Lo supero si resolví la injusticia, no quiero perder tiempo', 'colerico'], ['Perdono superficialmente, pero acumulo pequeñas heridas silenciosas', 'flematico'], ['Perdono rápido y olvido rápido, viva la vida', 'sanguineo'], ['Tengo un catálogo de traiciones y rara vez olvido por completo', 'melancolico']],
  ['m4_7', 'opcion_unica', 'Cuando los demás están tristes', '', ['Trato de resolverles el problema inmediatamente', 'colerico'], ['Los sostengo, empatizo fácilmente y lloro con ellos', 'flematico'], ['Trato de sacarles una sonrisa, cambio de tema', 'sanguineo'], ['Trato de entender la raíz psicológica de su sufrimiento', 'melancolico']],
  ['m4_8', 'escala', 'Tiendo a sentir que el mundo me debe algo', '', ['Yo me hago cargo de lo mío, el mundo no me debe nada', 'colerico'], ['A menudo, siento que doy demasiado y nadie me lo retribuye pasivamente', 'flematico'], ['No lo pienso, asumo que las cosas saldrán bien', 'sanguineo'], ['Siento que el mundo simplemente no alcanza mi estándar utópico', 'melancolico']],
  ['m4_9', 'comparativa', 'Cuando lloro...', '', ['Siento rabia conmigo mismo por llorar', 'colerico'], ['Me siento aliviado, es como un consuelo natural', 'flematico'], ['Lloramos y luego nos reímos en el mismo instante', 'sanguineo'], ['Es un llanto solitario, estructurado y dolorosamente solitario', 'melancolico']],
  ['m4_10', 'opcion_unica', 'Lo que más me duele es:', '', ['Que me quiten autoridad, ser inútil, que pierdan mi tiempo', 'colerico'], ['Que me rechacen, que el ambiente esté tenso sin motivo', 'flematico'], ['Que me ignoren, el aburrimiento extremo', 'sanguineo'], ['La incomprensión de lo profundo de mi alma', 'melancolico']],
  ['m4_11', 'opcion_unica', 'Ante una buena noticia tuya', '', ['Paso directo a buscar el próximo objetivo ("qué sigue")', 'colerico'], ['Me asusta un poco, no quiero destacar demasiado frente a quien sufre', 'flematico'], ['Quiero organizar una fiesta de inmediato para contarlo a mil personas', 'sanguineo'], ['Me alegro, pero dudo si durará o si me lo merezco del todo', 'melancolico']],
  ['m4_12', 'opcion_unica', 'Sobre el enojo interno', '', ['Es mi combustible a diario', 'colerico'], ['Me cuesta mucho conectarme, prefiero creer que no lo tengo', 'flematico'], ['Grito, me exaspero y en 5 minutos ya me olvidé', 'sanguineo'], ['Se vuelve un veneno silencioso de severidad contenida', 'melancolico']],
  ['m4_13', 'comparativa', 'Primero piensas o primero sientes', '', ['Pienso en lo que hay que hacer y sigo', 'colerico'], ['Soy instintivamente sentidor de contención', 'flematico'], ['Siento rápido como una ráfaga emocional de calor exterior', 'sanguineo'], ['Me encierro a pensar en frío por qué me siento de x forma', 'melancolico']],
  ['m4_14', 'opcion_unica', '¿Qué te abruma?', '', ['La incompetencia ajena prolongada', 'colerico'], ['Los gritos, el constante conflicto', 'flematico'], ['La soledad estática prolongada', 'sanguineo'], ['Estar expuesto a muchas personas desconocidas mucho tiempo', 'melancolico']],
];

const rawM5: CsvQ[] = [
  ['m5_1', 'opcion_unica', 'Qué buscas en pareja', '', ['Alguien que respete mis tiempos, que se sostenga sobre sus pies y podamos conquistar juntos', 'colerico'], ['Alguien amable, pasivo, de la casa, donde el cariño sea constante y blando', 'flematico'], ['Alguien divertido, que proponga mil planes y me haga reír', 'sanguineo'], ['Alguien capaz de conversar del universo, profunda, y de absoluta lealtad fiel', 'melancolico']],
  ['m5_2', 'opcion_unica', 'Si no te sientes visto/a en la relación', '', ['Exijo saber si pasa algo, o me voy enfocando en el trabajo', 'colerico'], ['Empiezo a servir más al otro esperando reciprocidad que nunca llega', 'flematico'], ['Hago ruido o busco a otro grupo de gente para tener la atención', 'sanguineo'], ['Me retraigo de forma amarga en silencio sintiendo el fracaso emocional mutuo', 'melancolico']],
  ['m5_3', 'opcion_unica', 'Rol que sueles adoptar', '', ['El líder, el que resuelve, el que da indicaciones', 'colerico'], ['El cuidador, la esponja, el oído incondicional', 'flematico'], ['El animador, la mascota alegre', 'sanguineo'], ['El analista del vínculo', 'melancolico']],
  ['m5_4', 'opcion_unica', 'Necesidad de cercanía', '', ['Prefiero mi autonomía, odio que estén encima mío', 'colerico'], ['Altísima necesidad casi táctil y pacífica del estar juntos en silencio', 'flematico'], ['Me gusta el contacto por juego, rápido, luego quiero ir a otra cosa', 'sanguineo'], ['Quiero una conexión mental y del alma de exclusividad total sin necesidad de abarrotamiento físico', 'melancolico']],
  ['m5_5', 'opcion_unica', 'Conflicto típico que te traen', '', ['"Eres muy insensible, duro y cortante"', 'colerico'], ['"No tomas postura nunca, todo te da igual, sé un poco vivo"', 'flematico'], ['"Nunca profundizamos nada, me cambias el tema y te distraes"', 'sanguineo'], ['"Sos demasiado intenso, denso, a todo le buscas la miseria"', 'melancolico']],
  ['m5_6', 'escala', 'Paz en el hogar', '', ['Me da igual el ambiente si tengo éxito', 'colerico'], ['Fundamental, sin paz en casa no funciono, cedo todo por ella', 'flematico'], ['Me gusta que haya ruido y gente visitando', 'sanguineo'], ['Quiero silencio monástico o sonidos de la naturaleza perfectos', 'melancolico']],
  ['m5_7', 'opcion_unica', 'En una fiesta o evento grupal', '', ['Busco hacer networking, me junto con el director y lidero la charla de la esquina', 'colerico'], ['Me quedo en un margen del sofá conversando y escuchando largamente a alguien', 'flematico'], ['Soy el centro de gravedad de las risas y cuentos de manera rotativa', 'sanguineo'], ['Voy por compromiso y aprecio las discusiones 1-1 en la cocina de forma teórica profunda', 'melancolico']],
  ['m5_8', 'comparativa', 'De niño, tus relaciones', '', ['Mandaba a los otros niños sobre qué jugar', 'colerico'], ['Era súper influenciable, a todos seguía incondicionalmente', 'flematico'], ['Conocía a medio mundo del colegio', 'sanguineo'], ['Tenía 1 o 2 amigos intensos, e inventábamos mundos privados', 'melancolico']],
  ['m5_9', 'opcion_unica', 'La mentira y la traición', '', ['Te corto los víveres para siempre', 'colerico'], ['Te dejo ir muy a mi pesar sintiéndome lastimado en silencio para siempre por evadir el choque', 'flematico'], ['Miro al otro lado y me voy volando', 'sanguineo'], ['Te abro 14 causas por lo inmoral y defectuoso de tu accionar, nunca se cierra', 'melancolico']],
  ['m5_10', 'escala', 'Tolerancia al control ajeno de la pareja', '', ['Cero, si me intentan controlar, es guerra nuclear', 'colerico'], ['A veces disfruto no tener que elegir yo y cedo', 'flematico'], ['Me zafaré con algún chiste y saldré sin que se de cuenta', 'sanguineo'], ['Es una ofensa profunda a mis capacidades elevadas, pero no pelearé vulgarmente', 'melancolico']],
  ['m5_11', 'opcion_unica', 'Atraes generalmente a', '', ['Personas necesitadas de dirección y de ser defendidas', 'colerico'], ['Personas arrolladoras, dominantes, intensas que agradecen tu calma blanda pasiva', 'flematico'], ['Gente un poco gris buscando desesperadamente un chispazo', 'sanguineo'], ['Otra gente intensa buscando ser curada de sus tragedias existenciales', 'melancolico']],
  ['m5_12', 'comparativa', 'Para recargar la batería de ti mismo', '', ['Cierro negocio, anoto en mi agenda mis metas en orden', 'colerico'], ['Miro tele sin pensar, me dejo llevar por la siesta pasiva', 'flematico'], ['Busco a un amigo para salir y tomar algo en una terraza', 'sanguineo'], ['Paseo solo por un bosque frío en silencio escribiendo poesía o reflexionando mi soledad existencial', 'melancolico']],
];

const rawM6: CsvQ[] = [
  ['m6_1', 'opcion_unica', 'Comportamiento en estrés', '', ['Asumo que nadie hará bien el trabajo y actúo coléricamente con mano dictadora', 'colerico'], ['Desaparezco emocionalmente', 'flematico'], ['Me hiper-expando histriónicamente, dejo todo a medias prometiendo al mundo', 'sanguineo'], ['Colapso en tristeza amarga de que este mundo no va a la par de mis exigencias', 'melancolico']],
  ['m6_2', 'opcion_unica', 'Con el tema niños/juego', '', ['Les organizo qué hacer', 'colerico'], ['Soy de tocarlos y que me inunden', 'flematico'], ['Soy uno de ellos', 'sanguineo'], ['Me cansan fácilmente por el ruido', 'melancolico']],
  ['m6_3', 'opcion_unica', 'El dinero', '', ['Es un medio. Trabajo duro y gano. Lo genero dominando.', 'colerico'], ['Es lindo para tener mucha comida y abrigo seguro constante en el sillón.', 'flematico'], ['Entra por encanto y se va volando, amo gastarlo en experiencias estéticas compartidas.', 'sanguineo'], ['Lo planifico celosamente y siento que es vital mi pureza sobre ganar demasiado manchándome para mi familia.', 'melancolico']],
  ['m6_4', 'opcion_unica', 'Tu frase más íntima', '', ['"La gente no entiende que si no es por mí todo se hunde en desgracia y quietud perversa"', 'colerico'], ['"Ojalá nadie me pida nada hoy ni se enfade... quiero amar suavemente y paz profunda que me resguarde en mantas afectuosas bajo la mesa "', 'flematico'], ['"Quiero vivirlo espectacularmente TODO, y mañana ya veremos "', 'sanguineo'], ['"Nadie entiende en serio este dolor. Me ennoblece sentir tanto... " ', 'melancolico']],
  ['m6_5', 'opcion_unica', 'Qué máscara sueles usar en tu trabajo habitual (con lo que compensas)', '', ['Sonreír obligadamente aunque quieras matar al inútil del equipo por atrasarte tanto (tu colérico cubierto)', 'colerico'], ['Disfrazarte de duro cuando no lo eres para que no te pasen a todos (tu debilidad flemática oculta)', 'flematico'], ['Intentar hacer un análisis riguroso aunque sabes que no te importa nada en serio 4 minutos después (tu falta de fondo sanguínea)', 'sanguineo'], ['Actuar optimista super-ventas sabiendo qué odias a toda la sociedad profundamente y te duele tu vacío con desprecio superior melancólico.', 'melancolico']],
  ['m6_6', 'opcion_unica', 'Visión del mundo', '', ['Es un campo de batalla para avanzar', 'colerico'], ['Es un lugar donde necesito hacerme mi nido de vínculos tiernos', 'flematico'], ['Es una caja de sorpresas gigantesca y festiva', 'sanguineo'], ['Es una ruina donde yo veo la perfección ausente y lloro', 'melancolico']],
  ['m6_7', 'opcion_unica', 'Tu relación con el pasado', '', ['Me da igual', 'colerico'], ['Añoro, me da paz recordar cuando estaban todos en la casa familiar ungiéndome a besitos', 'flematico'], ['Me río y cuento historias deformadas para hacerlas divertidas sobre aquel verano con tías', 'sanguineo'], ['Recuerdo exáctamente los datos, la ofensa que me hicieron hace 14 años y 10 días y duele exactamente igual y la justicia tarda en llegar para purificarme del mundo', 'melancolico']],
  ['m6_8', 'escala', 'Yo me adapto a...', '', ['A nada, yo hago que se adapten a mí', 'colerico'], ['A lo que necesiten mi pareja, siempre y cuando no haya gritos.', 'flematico'], ['A lo que pinte: salgamos o nos quedemos', 'sanguineo'], ['No me adapto, y por ende sufro solo viendo que tengo razón contra el 99%', 'melancolico']],
  ['m6_9', 'comparativa', 'Cuando no tienes tu necesidad principal satisfecha (compensación)', '', ['Despliego furia de control destructivo sistemático', 'colerico'], ['Pasivamente caigo en un sillón a comer', 'flematico'], ['Llamo a 4 exnovias a las 3 am buscando euforia', 'sanguineo'], ['Escribo en un diario el colapso absoluto de mi alma', 'melancolico']],
  ['m6_10', 'opcion_unica', 'La esencia que nadie conoce de ti al primer vistazo', '', ['Soy generoso con mi tiempo y ayudo si percibo al otro débil', 'colerico'], ['Tengo un resentimiento enorme acumulado de a poquito', 'flematico'], ['Toda mi intensidad puede ser mentira emocional de 5 segundos', 'sanguineo'], ['Sufro tantísimo la belleza del mundo a nivel casi romántico', 'melancolico']],
];


function buildQuestions(raw: CsvQ[], moduleId: string, weight: number): Question[] {
  return raw.map((q) => ({
    id: q[0],
    moduleId,
    type: q[1] as any,
    weight,
    text: q[2],
    deepModeText: q[3] ? q[3] : undefined,
    options: [
      { text: q[4][0], biotype: q[4][1] },
      { text: q[5][0], biotype: q[5][1] },
      { text: q[6][0], biotype: q[6][1] },
      { text: q[7][0], biotype: q[7][1] },
    ],
  }));
}

export const QUESTIONS: Question[] = [
  ...buildQuestions(rawM1, 'm1', 3),
  ...buildQuestions(rawM2, 'm2', 2),
  ...buildQuestions(rawM3, 'm3', 2),
  ...buildQuestions(rawM4, 'm4', 2),
  ...buildQuestions(rawM5, 'm5', 1.5),
  ...buildQuestions(rawM6, 'm6', 1),
];

export function getFilteredQuestions(isDeepMode: boolean): Question[] {
  if (isDeepMode) {
    return QUESTIONS;
  }
  
  const grouped: Record<string, Question[]> = {};
  QUESTIONS.forEach(q => {
    if (!grouped[q.moduleId]) grouped[q.moduleId] = [];
    grouped[q.moduleId].push(q);
  });

  const selected: Question[] = [];
  const moduleOrder = ['m1', 'm2', 'm3', 'm4', 'm5', 'm6'];
  
  moduleOrder.forEach(moduleId => {
    const qs = grouped[moduleId] || [];
    if (qs.length === 0) return;
    
    // Quick Mode uses a curated, representative set of 30 total questions:
    // m1: 6, m2: 5, m3: 5, m4: 5, m5: 5, m6: 4
    const targetCount = moduleId === 'm1' ? 6 : (moduleId === 'm6' ? 4 : 5);
    
    for (let i = 0; i < targetCount; i++) {
      const index = Math.min(Math.floor((i * qs.length) / targetCount), qs.length - 1);
      const q = qs[index];
      if (!selected.some(x => x.id === q.id)) {
        selected.push(q);
      }
    }
  });
  
  return selected;
}
