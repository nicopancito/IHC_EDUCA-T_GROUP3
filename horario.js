document.addEventListener('DOMContentLoaded', function() {
    cargarDatosGuardados();
    mostrarCursos();
    mostrarTareas();
    mostrarCalendario();
    actualizarContador();
});

var cursos = [
    { 
        id: 1,
        titulo: 'Lesson 01: Introduction about XD', 
        duracion: '30 mins', 
        color: 'bg-blue-200',
        plan: {
            titulo: 'Plan de Estudio (Curso) - Introduction about XD',
            descripcion: 'Aprende los fundamentos de Adobe XD desde cero',
            semanas: [
                {
                    semana: 1,
                    tema: 'Introducción a Adobe XD',
                    actividades: [
                        'Instalación y configuración del software',
                        'Exploración de la interfaz',
                        'Creación de tu primer artboard',
                        'Herramientas básicas de diseño'
                    ]
                },
                {
                    semana: 2,
                    tema: 'Diseño de interfaces básicas',
                    actividades: [
                        'Uso de formas y vectores',
                        'Tipografía y estilos de texto',
                        'Colores y gradientes',
                        'Práctica: Diseño de una app móvil simple'
                    ]
                },
                {
                    semana: 3,
                    tema: 'Prototipado y animaciones',
                    actividades: [
                        'Creación de prototipos interactivos',
                        'Transiciones entre pantallas',
                        'Auto-animate y microinteracciones',
                        'Práctica: Prototipo funcional'
                    ]
                },
                {
                    semana: 4,
                    tema: 'Proyecto final',
                    actividades: [
                        'Planificación del proyecto',
                        'Diseño completo de una aplicación',
                        'Creación de prototipo interactivo',
                        'Presentación y feedback'
                    ]
                }
            ]
        }
    },
    { 
        id: 2,
        titulo: 'Lesson 02: Advanced Design Patterns', 
        duracion: '30 mins', 
        color: 'bg-orange-200',
        plan: {
            titulo: 'Plan de Estudio (Curso) - Advanced Design Patterns',
            descripcion: 'Domina patrones avanzados de diseño UI/UX',
            semanas: [
                {
                    semana: 1,
                    tema: 'Patrones de navegación',
                    actividades: [
                        'Menús laterales y hamburguesa',
                        'Tab bars y navegación inferior',
                        'Breadcrumbs y navegación jerárquica',
                        'Casos de uso y mejores prácticas'
                    ]
                },
                {
                    semana: 2,
                    tema: 'Patrones de formularios',
                    actividades: [
                        'Validación de campos en tiempo real',
                        'Formularios de múltiples pasos',
                        'Auto-completado y sugerencias',
                        'Diseño de estados de error'
                    ]
                }
            ]
        }
    },
    { 
        id: 3,
        titulo: 'Lesson 03: User Research', 
        duracion: '30 mins', 
        color: 'bg-gray-200',
        plan: {
            titulo: 'Plan de Estudio (Curso) - User Research',
            descripcion: 'Técnicas de investigación de usuarios',
            semanas: [
                {
                    semana: 1,
                    tema: 'Fundamentos de UX Research',
                    actividades: [
                        'Métodos cualitativos vs cuantitativos',
                        'Creación de personas',
                        'Customer journey maps',
                        'Entrevistas con usuarios'
                    ]
                },
                {
                    semana: 2,
                    tema: 'Testing y validación',
                    actividades: [
                        'Usability testing',
                        'A/B testing',
                        'Análisis de métricas',
                        'Iteración basada en feedback'
                    ]
                }
            ]
        }
    },
    { 
        id: 4,
        titulo: 'Lesson 04: Design Systems', 
        duracion: '30 mins', 
        color: 'bg-purple-200',
        plan: {
            titulo: 'Plan de Estudio (Curso) - Design Systems',
            descripcion: 'Crea y mantén sistemas de diseño escalables',
            semanas: [
                {
                    semana: 1,
                    tema: 'Fundamentos de Design Systems',
                    actividades: [
                        '¿Qué es un design system?',
                        'Atomic design methodology',
                        'Tokens de diseño',
                        'Análisis de design systems existentes'
                    ]
                },
                {
                    semana: 2,
                    tema: 'Implementación práctica',
                    actividades: [
                        'Creación de componentes reutilizables',
                        'Documentación efectiva',
                        'Versionado y mantenimiento',
                        'Proyecto: Tu propio design system'
                    ]
                }
            ]
        }
    }
];

var tareas = [
    { 
        id: 'metas',
        titulo: 'Metas a corto plazo', 
        duracion: '....', 
        color: 'bg-blue-200',
        completado: false,
        formulario: {
            titulo: 'Metas a corto plazo',
            descripcion: 'Define qué quieres lograr en los próximos 3-6 meses',
            campos: [
                { nombre: 'meta1', label: 'Meta principal', tipo: 'text', placeholder: 'Ej: Dominar Adobe XD' },
                { nombre: 'meta2', label: 'Meta secundaria', tipo: 'text', placeholder: 'Ej: Crear mi primer proyecto' },
                { nombre: 'plazo', label: 'Plazo deseado', tipo: 'select', opciones: ['1 mes', '3 meses', '6 meses'] }
            ]
        }
    },
    { 
        id: 'cursos',
        titulo: 'Cursos a reforzar', 
        duracion: '.....', 
        color: 'bg-orange-200',
        completado: false,
        formulario: {
            titulo: 'Cursos a reforzar',
            descripcion: 'Indica qué temas necesitas estudiar o mejorar',
            campos: [
                { nombre: 'curso1', label: 'Curso 1', tipo: 'text', placeholder: 'Ej: Diseño UI/UX' },
                { nombre: 'curso2', label: 'Curso 2', tipo: 'text', placeholder: 'Ej: Prototipado' },
                { nombre: 'prioridad', label: 'Nivel de prioridad', tipo: 'select', opciones: ['Alta', 'Media', 'Baja'] }
            ]
        }
    },
    { 
        id: 'horario',
        titulo: 'Horario de clases', 
        duracion: '.....', 
        color: 'bg-blue-100',
        completado: false,
        formulario: {
            titulo: 'Horario de clases',
            descripcion: 'Cuéntanos sobre tu horario académico actual',
            campos: [
                { nombre: 'inicio', label: 'Hora de inicio', tipo: 'time' },
                { nombre: 'fin', label: 'Hora de fin', tipo: 'time' },
                { nombre: 'dias', label: 'Días de clase', tipo: 'text', placeholder: 'Ej: Lunes, Miércoles, Viernes' }
            ]
        }
    },
    { 
        id: 'animo',
        titulo: 'Estado de animo semanal', 
        duracion: '.....', 
        color: 'bg-pink-200',
        completado: false,
        formulario: {
            titulo: 'Estado de ánimo semanal',
            descripcion: 'Ayúdanos a entender tu energía durante la semana',
            campos: [
                { nombre: 'mejor_dia', label: 'Mejor día para estudiar', tipo: 'select', opciones: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'] },
                { nombre: 'energia', label: 'Nivel de energía general', tipo: 'select', opciones: ['Alto', 'Medio', 'Bajo'] },
                { nombre: 'notas', label: 'Notas adicionales', tipo: 'textarea', placeholder: 'Ej: Los martes tengo más energía por las mañanas' }
            ]
        }
    },
    { 
        id: 'sueno',
        titulo: 'Horario de sueño', 
        duracion: '.....', 
        color: 'bg-gray-200',
        completado: false,
        formulario: {
            titulo: 'Horario de sueño',
            descripcion: 'Define tu rutina de descanso para optimizar tu plan',
            campos: [
                { nombre: 'dormir', label: 'Hora de dormir', tipo: 'time' },
                { nombre: 'despertar', label: 'Hora de despertar', tipo: 'time' },
                { nombre: 'calidad', label: 'Calidad del sueño', tipo: 'select', opciones: ['Excelente', 'Buena', 'Regular', 'Mala'] }
            ]
        }
    },
    { 
        id: 'tiempo',
        titulo: 'Tiempo disponible', 
        duracion: '....', 
        color: 'bg-orange-200',
        completado: false,
        formulario: {
            titulo: 'Tiempo disponible',
            descripcion: 'Cuántas horas puedes dedicar al estudio',
            campos: [
                { nombre: 'horas_diarias', label: 'Horas diarias', tipo: 'number', placeholder: '2' },
                { nombre: 'dias_semana', label: 'Días por semana', tipo: 'number', placeholder: '5' },
                { nombre: 'preferencia', label: 'Horario preferido', tipo: 'select', opciones: ['Mañana', 'Tarde', 'Noche', 'Flexible'] }
            ]
        }
    },
    { 
        id: 'estilo',
        titulo: 'Estilo de aprendizaje', 
        duracion: '.....', 
        color: 'bg-gray-100',
        completado: false,
        formulario: {
            titulo: 'Estilo de aprendizaje',
            descripcion: 'Cómo prefieres aprender mejor',
            campos: [
                { nombre: 'tipo', label: 'Tipo de aprendizaje', tipo: 'select', opciones: ['Visual', 'Auditivo', 'Kinestésico', 'Lectura/Escritura'] },
                { nombre: 'metodo', label: 'Método preferido', tipo: 'select', opciones: ['Videos', 'Artículos', 'Práctica directa', 'Tutoriales interactivos'] },
                { nombre: 'ritmo', label: 'Ritmo de aprendizaje', tipo: 'select', opciones: ['Rápido', 'Moderado', 'Pausado'] }
            ]
        }
    }
];

var nombresMeses = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var mesActual = new Date(2021, 8);
var cursoSeleccionado = null;
var tareaActual = null;
var datosEntregables = {};

function cargarDatosGuardados() {
    var guardado = localStorage.getItem('datosEntregables');
    if (guardado) {
        datosEntregables = JSON.parse(guardado);
        for (var i = 0; i < tareas.length; i++) {
            if (datosEntregables[tareas[i].id]) {
                tareas[i].completado = true;
            }
        }
    }
}

function guardarDatos() {
    localStorage.setItem('datosEntregables', JSON.stringify(datosEntregables));
}

function mostrarCursos() {
    var lista = document.getElementById('cursos-list');
    if (!lista) return;
    
    var html = '';
    for (var i = 0; i < cursos.length; i++) {
        html += '<div class="curso-item ' + cursos[i].color + ' p-3 rounded-lg mb-2 flex items-center justify-between border-2 border-transparent" onclick="seleccionarCurso(' + cursos[i].id + ')" id="curso-' + cursos[i].id + '">';
        html += '<div class="flex items-center">';
        html += '<div class="w-6 h-6 bg-gray-800 rounded mr-2"></div>';
        html += '<p class="text-sm font-medium text-gray-800">' + cursos[i].titulo + '</p>';
        html += '</div>';
        html += '<span class="text-xs text-gray-600">' + cursos[i].duracion + '</span>';
        html += '</div>';
    }
    
    lista.innerHTML = html;
}

function mostrarTareas() {
    var lista = document.getElementById('tareas-list');
    if (!lista) return;
    
    var html = '';
    for (var i = 0; i < tareas.length; i++) {
        var tarea = tareas[i];
        var checkIcon = tarea.completado ? '<svg class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>' : '<div class="w-5 h-5 border-2 border-gray-400 rounded"></div>';
        
        html += '<div class="tarea-item ' + tarea.color + ' p-3 rounded-lg mb-2 flex items-center justify-between ' + (tarea.completado ? 'completado' : '') + '" onclick="abrirFormulario(\'' + tarea.id + '\')">';
        html += '<div class="flex items-center">';
        html += checkIcon;
        html += '<p class="text-sm font-medium text-gray-800 ml-2">' + tarea.titulo + '</p>';
        html += '</div>';
        html += '<span class="text-xs text-gray-600">' + tarea.duracion + '</span>';
        html += '</div>';
    }
    
    lista.innerHTML = html;
}

function actualizarContador() {
    var completados = 0;
    for (var i = 0; i < tareas.length; i++) {
        if (tareas[i].completado) completados++;
    }
    
    var contador = document.getElementById('contador-completados');
    if (contador) {
        contador.textContent = completados + ' de ' + tareas.length + ' completados';
    }
    
    var btnGenerar = document.getElementById('btn-generar');
    if (btnGenerar) {
        if (completados === tareas.length) {
            btnGenerar.disabled = false;
        } else {
            btnGenerar.disabled = true;
        }
    }
}

function abrirFormulario(tareaId) {
    var tarea = null;
    for (var i = 0; i < tareas.length; i++) {
        if (tareas[i].id === tareaId) {
            tarea = tareas[i];
            break;
        }
    }
    
    if (!tarea) return;
    
    tareaActual = tareaId;
    
    document.getElementById('info-panel').style.display = 'none';
    document.getElementById('calendario-seccion').style.display = 'none';
    document.getElementById('plan-estudio').classList.add('hidden');
    
    var formDiv = document.getElementById('formulario-entregable');
    var titulo = document.getElementById('form-titulo');
    var descripcion = document.getElementById('form-descripcion');
    var contenido = document.getElementById('form-contenido');
    
    titulo.textContent = tarea.formulario.titulo;
    descripcion.textContent = tarea.formulario.descripcion;
    
    var html = '<div class="space-y-4">';
    
    for (var i = 0; i < tarea.formulario.campos.length; i++) {
        var campo = tarea.formulario.campos[i];
        var valorGuardado = datosEntregables[tareaId] ? datosEntregables[tareaId][campo.nombre] || '' : '';
        
        html += '<div>';
        html += '<label class="block text-sm font-medium text-gray-700 mb-2">' + campo.label + '</label>';
        
        if (campo.tipo === 'select') {
            html += '<select name="' + campo.nombre + '" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">';
            html += '<option value="">Seleccionar...</option>';
            for (var j = 0; j < campo.opciones.length; j++) {
                var selected = valorGuardado === campo.opciones[j] ? 'selected' : '';
                html += '<option value="' + campo.opciones[j] + '" ' + selected + '>' + campo.opciones[j] + '</option>';
            }
            html += '</select>';
        } else if (campo.tipo === 'textarea') {
            html += '<textarea name="' + campo.nombre + '" rows="3" placeholder="' + (campo.placeholder || '') + '" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">' + valorGuardado + '</textarea>';
        } else {
            html += '<input type="' + campo.tipo + '" name="' + campo.nombre + '" value="' + valorGuardado + '" placeholder="' + (campo.placeholder || '') + '" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">';
        }
        
        html += '</div>';
    }
    
    html += '</div>';
    
    contenido.innerHTML = html;
    formDiv.classList.remove('hidden');
    formDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function guardarEntregable() {
    if (!tareaActual) return;
    
    var tarea = null;
    for (var i = 0; i < tareas.length; i++) {
        if (tareas[i].id === tareaActual) {
            tarea = tareas[i];
            break;
        }
    }
    
    if (!tarea) return;
    
    var formulario = document.getElementById('form-contenido');
    var inputs = formulario.querySelectorAll('input, select, textarea');
    var datos = {};
    
    for (var i = 0; i < inputs.length; i++) {
        datos[inputs[i].name] = inputs[i].value;
    }
    
    datosEntregables[tareaActual] = datos;
    tarea.completado = true;
    
    guardarDatos();
    cerrarFormulario();
    mostrarTareas();
    actualizarContador();
    
    alert('¡Datos guardados correctamente!');
}

function cerrarFormulario() {
    document.getElementById('formulario-entregable').classList.add('hidden');
    document.getElementById('info-panel').style.display = 'block';
    document.getElementById('calendario-seccion').style.display = 'block';
    tareaActual = null;
}

function generarPlan() {
    var completados = 0;
    for (var i = 0; i < tareas.length; i++) {
        if (tareas[i].completado) completados++;
    }
    
    if (completados < tareas.length) {
        alert('Por favor completa todos los entregables antes de generar tu plan.');
        return;
    }
    
    alert('¡Generando tu plan personalizado con IA! 🤖✨\n\nEsto puede tomar unos segundos...');
    
    setTimeout(function() {
        alert('¡Plan generado exitosamente! 🎉\n\nPuedes ver tu nuevo plan en "Planes de estudio generados"');
    }, 2000);
}

function seleccionarCurso(cursoId) {
    var curso = null;
    for (var i = 0; i < cursos.length; i++) {
        if (cursos[i].id === cursoId) {
            curso = cursos[i];
            break;
        }
    }
    
    if (!curso) return;
    
    cursoSeleccionado = cursoId;
    
    var todosLosCursos = document.querySelectorAll('.curso-item');
    for (var i = 0; i < todosLosCursos.length; i++) {
        todosLosCursos[i].classList.remove('active');
    }
    
    var cursoElemento = document.getElementById('curso-' + cursoId);
    if (cursoElemento) {
        cursoElemento.classList.add('active');
    }
    
    document.getElementById('info-panel').style.display = 'none';
    document.getElementById('calendario-seccion').style.display = 'none';
    document.getElementById('formulario-entregable').classList.add('hidden');
    
    mostrarPlanEstudio(curso.plan);
}

function mostrarPlanEstudio(plan) {
    var planDiv = document.getElementById('plan-estudio');
    var titulo = document.getElementById('plan-titulo');
    var descripcion = document.getElementById('plan-descripcion');
    var contenido = document.getElementById('plan-contenido');
    
    titulo.textContent = plan.titulo;
    descripcion.textContent = plan.descripcion;
    
    var html = '<div class="space-y-6">';
    
    for (var i = 0; i < plan.semanas.length; i++) {
        var semana = plan.semanas[i];
        html += '<div class="border-l-4 border-blue-500 pl-4">';
        html += '<h3 class="text-lg font-bold text-gray-900 mb-2">Semana ' + semana.semana + ': ' + semana.tema + '</h3>';
        html += '<ul class="space-y-2">';
        
        for (var j = 0; j < semana.actividades.length; j++) {
            html += '<li class="flex items-start">';
            html += '<svg class="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">';
            html += '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>';
            html += '</svg>';
            html += '<span class="text-gray-700">' + semana.actividades[j] + '</span>';
            html += '</li>';
        }
        
        html += '</ul>';
        html += '</div>';
    }
    
    html += '</div>';
    
    contenido.innerHTML = html;
    planDiv.classList.remove('hidden');
    
    planDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function cerrarPlan() {
    document.getElementById('plan-estudio').classList.add('hidden');
    document.getElementById('info-panel').style.display = 'block';
    document.getElementById('calendario-seccion').style.display = 'block';
    
    if (cursoSeleccionado) {
        var cursoElemento = document.getElementById('curso-' + cursoSeleccionado);
        if (cursoElemento) {
            cursoElemento.classList.remove('active');
        }
        cursoSeleccionado = null;
    }
}

function mostrarCalendario() {
    var titulo = document.getElementById('calendar-title');
    var grilla = document.getElementById('calendar-grid');
    
    if (!titulo || !grilla) return;
    
    titulo.textContent = nombresMeses[mesActual.getMonth()] + ' ' + mesActual.getFullYear();
    
    var anio = mesActual.getFullYear();
    var mes = mesActual.getMonth();
    var primerDia = new Date(anio, mes, 1).getDay();
    var diasEnMes = new Date(anio, mes + 1, 0).getDate();
    
    var html = '';
    
    var diasSemana = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
    for (var i = 0; i < 7; i++) {
        html += '<div class="text-xs font-bold text-gray-500 py-2">' + diasSemana[i] + '</div>';
    }
    
    for (var i = 0; i < primerDia; i++) {
        html += '<div class="py-2"></div>';
    }
    
    for (var dia = 1; dia <= diasEnMes; dia++) {
        if (dia === 12) {
            html += '<div class="py-3 text-sm bg-blue-500 text-white rounded-lg font-bold">' + dia + '</div>';
        } else {
            html += '<div class="py-3 text-sm text-gray-700">' + dia + '</div>';
        }
    }
    
    grilla.innerHTML = html;
}

function mesAnterior() {
    mesActual = new Date(mesActual.getFullYear(), mesActual.getMonth() - 1);
    mostrarCalendario();
}

function mesSiguiente() {
    mesActual = new Date(mesActual.getFullYear(), mesActual.getMonth() + 1);
    mostrarCalendario();
}

function cerrarInfo() {
    var panel = document.getElementById('info-panel');
    if (panel) {
        panel.style.display = 'none';
    }
}