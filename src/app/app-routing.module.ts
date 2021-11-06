import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';

import { AutoevaluacionesComponent } from './autoevaluacion/autoevaluaciones/autoevaluaciones.component';
import { AutoevaluacionComponent } from './autoevaluacion/autoevaluacion.component';
import { AutoevaluacionAddeditComponent } from './autoevaluacion/autoevaluacion-addedit/autoevaluacion-addedit.component';

import { CalendariosComponent } from './calendario/calendarios/calendarios.component';
import { CalendarioComponent } from './calendario/calendario.component';
import { CalendarioAddeditComponent } from './calendario/calendario-addedit/calendario-addedit.component';

import { CategoriasComponent } from './categoria/categorias/categorias.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { CategoriaAddeditComponent } from './categoria/categoria-addedit/categoria-addedit.component';

import { CursosComponent } from './curso/cursos/cursos.component';
import { CursoComponent } from './curso/curso.component';
import { CursoAddeditComponent } from './curso/curso-addedit/curso-addedit.component';

import { EstudiantesComponent } from './estudiante/estudiantes/estudiantes.component';
import { EstudianteComponent } from './estudiante/estudiante.component';
import { EstudianteAddeditComponent } from './estudiante/estudiante-addedit/estudiante-addedit.component';

import { EstudianteMateriasComponent } from './estudiante-materia/estudiante-materias/estudiante-materias.component';
import { EstudianteMateriaComponent } from './estudiante-materia/estudiante-materia.component';
import { EstudianteMateriaAddeditComponent } from './estudiante-materia/estudiante-materia-addedit/estudiante-materia-addedit.component'

import { EvaluacionProfesoresComponent } from './evaluacion-profesor/evaluacion-profesores/evaluacion-profesores.component';
import { EvaluacionProfesorComponent } from './evaluacion-profesor/evaluacion-profesor.component';
import { EvaluacionProfesorAddeditComponent } from './evaluacion-profesor/evaluacion-profesor-addedit/evaluacion-profesor-addedit.component';

import { FotosComponent } from './foto/fotos/fotos.component';
import { FotoComponent } from './foto/foto.component';
import { FotoAddeditComponent } from './foto/foto-addedit/foto-addedit.component';

import { HorariosComponent } from './horario/horarios/horarios.component';
import { HorarioComponent } from './horario/horario.component';
import { HorarioAddeditComponent } from './horario/horario-addedit/horario-addedit.component';

import { InstitucionesComponent } from './institucion/instituciones/instituciones.component';
import { InstitucionComponent } from './institucion/institucion.component';
import { InstitucionAddeditComponent } from './institucion/institucion-addedit/institucion-addedit.component';

import { MateriasComponent } from './materia/materias/materias.component';
import { MateriaComponent } from './materia/materia.component';
import { MateriaAddeditComponent } from './materia/materia-addedit/materia-addedit.component';

import { MateriaDictadasComponent } from './materia-dictada/materia-dictadas/materia-dictadas.component';
import { MateriaDictadaComponent } from './materia-dictada/materia-dictada.component';
import { MateriaDictadaAddeditComponent } from './materia-dictada/materia-dictada-addedit/materia-dictada-addedit.component';

import { NotasComponent } from './nota/notas/notas.component';
import { NotaComponent } from './nota/nota.component';
import { NotaAddeditComponent } from './nota/nota-addedit/nota-addedit.component';

import { NotificacionesComponent } from './notificacion/notificaciones/notificaciones.component';
import { NotificacionComponent } from './notificacion/notificacion.component';
import { NotificacionAddeditComponent } from './notificacion/notificacion-addedit/notificacion-addedit.component';

import { ParalelosComponent } from './paralelo/paralelos/paralelos.component';
import { ParaleloComponent } from './paralelo/paralelo.component';
import { ParaleloAddeditComponent } from './paralelo/paralelo-addedit/paralelo-addedit.component';

import { ParametrosComponent } from './parametro/parametros/parametros.component';
import { ParametroComponent } from './parametro/parametro.component';
import { ParametroAddeditComponent } from './parametro/parametro-addedit/parametro-addedit.component';

import { PeriodosComponent } from './periodo/periodos/periodos.component';
import { PeriodoComponent } from './periodo/periodo.component';
import { PeriodoAddeditComponent } from './periodo/periodo-addedit/periodo-addedit.component';

import { ProfesoresComponent } from './profesor/profesores/profesores.component';
import { ProfesorComponent } from './profesor/profesor.component';
import { ProfesorAddeditComponent } from './profesor/profesor-addedit/profesor-addedit.component';
import { InicioProfesorComponent } from './profesor/inicio-profesor/inicio-profesor.component';
import { ProfesorEditarComponent } from './profesor/profesor-editar/profesor-editar.component';

import { RepresentantesComponent } from './representante/representantes/representantes.component';
import { RepresentanteComponent } from './representante/representante.component';
import { RepresentanteAddeditComponent } from './representante/representante-addedit/representante-addedit.component';
import { InicioRepresentanteComponent } from './representante/inicio-representante/inicio-representante.component';
import { RepresentanteEditarComponent } from './representante/representante-editar/representante-editar.component';

import { RolesComponent } from './rol/roles/roles.component';
import { RolComponent } from './rol/rol.component';
import { RolAddeditComponent } from './rol/rol-addedit/rol-addedit.component';

import { RudesComponent } from './rude/rudes/rudes.component';
import { RudeComponent } from './rude/rude.component';
import { RudeAddeditComponent } from './rude/rude-addedit/rude-addedit.component';

import { UsuariosComponent } from './usuario/usuarios/usuarios.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { UsuarioAddeditComponent } from './usuario/usuario-addedit/usuario-addedit.component';

// Funcionalidades
import { RegistroUsuariosComponent } from './registro-usuario/registro-usuarios/registro-usuarios.component';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';
import { RegistroUsuarioAddeditComponent } from './registro-usuario/registro-usuario-addedit/registro-usuario-addedit.component';

import { RegistroEstudiantesComponent } from './registro-estudiante/registro-estudiantes/registro-estudiantes.component';
import { RegistroEstudianteComponent } from './registro-estudiante/registro-estudiante.component';
import { RegistroEstudianteAddeditComponent } from './registro-estudiante/registro-estudiante-addedit/registro-estudiante-addedit.component';
import { RegistroEstudianteEditarComponent } from './registro-estudiante/registro-estudiante-editar/registro-estudiante-editar.component';

import { LoginProfesorComponent } from './login-profesor/login-profesor.component';
import { LoginEstudianteComponent } from './login-estudiante/login-estudiante.component';
import { LoginRepresentanteComponent } from './login-representante/login-representante.component';

import { LoginAdministradorComponent } from './login-administrador/login-administrador.component';
import { AdministradoresComponent } from './login-administrador/administradores/administradores.component';
import { AdministradorComponent } from './login-administrador/administrador/administrador.component';
import { InicioAdministradorComponent } from './login-administrador/inicio-administrador/inicio-administrador.component';
import { AdministradorEditarComponent } from './login-administrador/administrador-editar/administrador-editar.component';

import { RegistroRudeComponent } from './registro-rude/registro-rude.component';
import { RegistroRudeAddeditComponent } from './registro-rude/registro-rude-addedit/registro-rude-addedit.component';
import { RegistroRudesComponent } from './registro-rude/registro-rudes/registro-rudes.component';
import { RegistroRudeEditarComponent } from './registro-rude/registro-rude-editar/registro-rude-editar.component';
//Para estudiante
import { RegistroNotaComponent } from './registro-nota/registro-nota.component';
import { RegistroCalificacionComponent } from './registro-nota/registro-calificacion/registro-calificacion.component';

import { RegistroNotaAutoevaluacionComponent } from './registro-nota/registro-nota-autoevaluacion/registro-nota-autoevaluacion.component';
import { RegistroAutoevaluacionAddComponent } from './registro-autoevaluacion/registro-autoevaluacion-add/registro-autoevaluacion-add.component';
import { RegistroAutoevaluacionComponent } from './registro-autoevaluacion/registro-autoevaluacion.component';
import { RegistroAutoevaluacionesComponent } from './registro-autoevaluacion/registro-autoevaluaciones/registro-autoevaluaciones.component';

import { RegistroEvaluacionAlumnoAddComponent } from './registro-evaluacion-alumno/registro-evaluacion-alumno-add/registro-evaluacion-alumno-add.component';
import { RegistroNotaAlumnoComponent } from './registro-nota/registro-nota-alumno/registro-nota-alumno.component';

import { RegistroRepresentanteComponent } from './registro-representante/registro-representante.component';
import { RegistroRepresentanteMadreComponent } from './registro-representante/registro-representante-madre/registro-representante-madre.component';
import { RegistroRepresentanteTutorComponent } from './registro-representante/registro-representante-tutor/registro-representante-tutor.component';

import { InicioComponent } from './inicio/inicio.component';
import { RegistrarseComponent } from './registrarse/registrarse.component';
import { HorarioEstudianteComponent } from './horario-estudiante/horario-estudiante.component';

import { ImprimirRudeComponent } from './imprimir-rude/imprimir-rude.component';
import { PerfilAdministradorComponent } from './perfil-administrador/perfil-administrador.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';

import { EstudianteCursosComponent } from './estudiante-curso/estudiante-cursos/estudiante-cursos.component';
import { EstudianteCursoComponent } from './estudiante-curso/estudiante-curso.component';
import { EstudianteCursoAddeditComponent } from './estudiante-curso/estudiante-curso-addedit/estudiante-curso-addedit.component';

import { AsistenciasComponent } from './asistencia/asistencias/asistencias.component';
import { AsistenciaComponent } from './asistencia/asistencia.component';
import { AsistenciaAddeditComponent } from './asistencia/asistencia-addedit/asistencia-addedit.component';
import { ListaEstudiantesComponent } from './asistencia/lista-estudiantes/lista-estudiantes.component';

import { CalendarioVistaComponent } from './calendario-vista/calendario-vista.component';
import { EvaluacionContinuaComponent } from './evaluacion-continua/evaluacion-continua.component';

import { CalificacionesComponent } from './calificacion/calificaciones/calificaciones.component';
import { CalificacionComponent } from './calificacion/calificacion.component';
import { CalificacionAddeditComponent } from './calificacion/calificacion-addedit/calificacion-addedit.component';

import { RegNotassComponent } from './reg-notas/reg-notass/reg-notass.component';
import { RegNotasComponent } from './reg-notas/reg-notas.component';
import { RegNotasAddeditComponent } from './reg-notas/reg-notas-addedit/reg-notas-addedit.component';

import { InicioCursoComponent } from './inicio-curso/inicio-curso.component';
import { PerfilAdmComponent } from './perfil-adm/perfil-adm.component';

const routes: Routes = [
  { path: 'ingresar', component: LoginComponent },

  { path: 'calendario', component: CalendariosComponent, pathMatch: 'full' },
  { path: 'calendario/:id', component: CalendarioComponent },
  { path: 'addCalendario', component: CalendarioAddeditComponent },
  { path: 'calendario/edit/:id', component: CalendarioAddeditComponent },

  { path: 'categoria', component: CategoriasComponent, pathMatch: 'full' },
  { path: 'categoria/:id', component: CategoriaComponent },
  { path: 'addCategoria', component: CategoriaAddeditComponent },
  { path: 'categoria/edit/:id', component: CategoriaAddeditComponent },

  { path: 'curso', component: CursosComponent, pathMatch: 'full' },
  { path: 'curso/:id', component: CursoComponent },
  { path: 'addCurso', component: CursoAddeditComponent },
  { path: 'curso/edit/:id', component: CursoAddeditComponent },
  
  { path: 'estudiante', component: EstudiantesComponent, pathMatch: 'full' },
  { path: 'estudiante/:id', component: EstudianteComponent },
  { path: 'addEstudiante', component: EstudianteAddeditComponent },
  { path: 'estudiante/edit/:id', component: EstudianteAddeditComponent },

  { path: 'estudianteMateria', component: EstudianteMateriasComponent, pathMatch: 'full' },
  { path: 'estudianteMateria/:id', component: EstudianteMateriaComponent },
  { path: 'addEstudianteMateria', component: EstudianteMateriaAddeditComponent },
  { path: 'estudianteMateria/edit/:id', component: EstudianteMateriaAddeditComponent },
  
  { path: 'evaluacionProfesor', component: EvaluacionProfesoresComponent, pathMatch: 'full' },
  { path: 'evaluacionProfesor/:id', component: EvaluacionProfesorComponent },
  { path: 'addEvaluacionProfesor', component: EvaluacionProfesorAddeditComponent },
  { path: 'evaluacionProfesor/edit/:id', component: EvaluacionProfesorAddeditComponent },

  { path: 'fotos', component: FotosComponent, pathMatch: 'full' },
  { path: 'fotos/:id', component: FotoComponent },
  { path: 'addFotos', component: FotoAddeditComponent },
  { path: 'fotos/edit/:id', component: FotoAddeditComponent },

  { path: 'horario', component: HorariosComponent, pathMatch: 'full' },
  { path: 'horario/:id', component: HorarioComponent },
  { path: 'addHorario', component: HorarioAddeditComponent },
  { path: 'horario/edit/:id', component: HorarioAddeditComponent },

  { path: 'materia', component: MateriasComponent, pathMatch: 'full' },
  { path: 'materia/:id', component: MateriaComponent },
  { path: 'addMateria', component: MateriaAddeditComponent },
  { path: 'materia/edit/:id', component: MateriaAddeditComponent },

  { path: 'nota', component: NotasComponent, pathMatch: 'full' },
  { path: 'nota/:id', component: NotaComponent },
  { path: 'addNota', component: NotaAddeditComponent },
  { path: 'nota/edit/:id', component: NotaAddeditComponent },

  { path: 'notificacion', component: NotificacionesComponent, pathMatch: 'full' },
  { path: 'notificacion/:id', component: NotificacionComponent },
  { path: 'addNotificacion', component: NotificacionAddeditComponent },
  { path: 'notificacion/edit/:id', component: NotificacionAddeditComponent },

  { path: 'paralelo', component: ParalelosComponent, pathMatch: 'full' },
  { path: 'paralelo/:id', component: ParaleloComponent },
  { path: 'addParalelo', component: ParaleloAddeditComponent },
  { path: 'paralelo/edit/:id', component: ParaleloAddeditComponent },

  { path: 'parametro', component: ParametrosComponent, pathMatch: 'full' },
  { path: 'parametro/:id', component: ParametroComponent },
  { path: 'addParametro', component: ParametroAddeditComponent },
  { path: 'parametro/edit/:id', component: ParametroAddeditComponent },
  
  { path: 'periodo', component: PeriodosComponent, pathMatch: 'full' },
  { path: 'periodo/:id', component: PeriodoComponent },
  { path: 'addPeriodo', component: PeriodoAddeditComponent },
  { path: 'periodo/edit/:id', component: PeriodoAddeditComponent },

  { path: 'profesor', component: ProfesoresComponent, pathMatch: 'full' },
  { path: 'profesor/:id', component: ProfesorComponent },
  { path: 'addProfesor', component: ProfesorAddeditComponent },
  { path: 'inicioProfesor', component: InicioProfesorComponent },
  { path: 'editarProfesor', component: ProfesorEditarComponent },
  { path: 'profesor/ver/:id', component: LoginProfesorComponent },

  { path: 'representante', component: RepresentantesComponent, pathMatch: 'full' },
  { path: 'representante/:id', component: RepresentanteComponent },
  { path: 'addRepresentante', component: RepresentanteAddeditComponent },
  { path: 'representante/edit/:id', component: RepresentanteAddeditComponent },
  { path: 'inicioRepresentante', component: InicioRepresentanteComponent },
  { path: 'editarRepresentante', component: RepresentanteEditarComponent },
  { path: 'representante/ver/:id', component: LoginRepresentanteComponent },

  { path: 'rol', component: RolesComponent, pathMatch: 'full' },
  { path: 'rol/:id', component: RolComponent },
  { path: 'add', component: RolAddeditComponent },
  { path: 'rol/edit/:id', component: RolAddeditComponent },

  { path: 'rude', component: RudesComponent, pathMatch: 'full' },
  { path: 'rude/:id', component:  RudeComponent },
  { path: 'addRude', component:  RudeAddeditComponent },
  { path: 'rude/edit/:id', component:  RudeAddeditComponent },

  { path: 'usuario', component: UsuariosComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'usuario/:id', component: UsuarioComponent },
  { path: 'addUsuario', component: UsuarioAddeditComponent },
  { path: 'usuario/edit/:id', component: UsuarioAddeditComponent },

  // Funcionalidades
  { path: 'registro-estudiante', component: RegistroEstudiantesComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'registro-estudiante/:id', component: RegistroEstudianteComponent },
  { path: 'addRegistroEstudiante', component: RegistroEstudianteAddeditComponent },
  { path: 'registro-estudiante/edit/:id', component: RegistroEstudianteAddeditComponent },
  { path: 'registro-estudiante-nuevo', component: RegistroEstudianteComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'registro-estudiante-editar', component: RegistroEstudianteEditarComponent, pathMatch: 'full', canActivate: [AuthGuard] },

  { path: 'registro-usuario', component: RegistroUsuariosComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'registro-usuario/:id', component: RegistroUsuarioComponent },
  { path: 'addRegistroUsuario/:id/:entidad', component: RegistroUsuarioAddeditComponent },
  { path: 'registro-usuario/edit/:id', component: RegistroUsuarioAddeditComponent },
  
  { path: 'login-representante', component: LoginRepresentanteComponent },
  { path: 'login-profesor', component: LoginProfesorComponent },
  { path: 'login-estudiante', component: LoginEstudianteComponent },

  { path: 'login-administrador', component: LoginAdministradorComponent },
  { path: 'administrador', component: AdministradoresComponent, pathMatch: 'full' },
  { path: 'administrador/:id', component: AdministradorComponent },
  { path: 'inicioAdministrador', component: InicioAdministradorComponent },
  { path: 'editarAdministrador', component: AdministradorEditarComponent },
  { path: 'administrador/ver/:id', component: LoginAdministradorComponent },

  { path: 'registro-rude', component: RegistroRudeComponent },
  { path: 'addRegistroRude', component: RegistroRudeAddeditComponent },
  { path: 'registro-rude-lista', component: RegistroRudesComponent },
  { path: 'registro-rude/edit/:id', component: RegistroRudeAddeditComponent },
  { path: 'registro-rude-editar', component: RegistroRudeEditarComponent },
  
  { path: 'registro-nota', component: RegistroNotaComponent },
  { path: 'registro-calificacion', component: RegistroCalificacionComponent },

  { path: 'autoevaluacion', component: AutoevaluacionesComponent, pathMatch: 'full' },
  { path: 'autoevaluacion/:id', component: AutoevaluacionComponent },
  { path: 'addAutoevaluacion', component: AutoevaluacionAddeditComponent },
  { path: 'autoevaluacion/edit/:id', component: AutoevaluacionAddeditComponent },

  { path: 'registro-nota-autoevaluacion', component: RegistroNotaAutoevaluacionComponent },

  { path: 'registro-autoevaluacion/:id', component: RegistroAutoevaluacionComponent},
  { path: 'registro-autoevaluaciones', component: RegistroAutoevaluacionesComponent, pathMatch: 'full' },
  { path: 'addRegistroAutoevaluacion/:ids', component: RegistroAutoevaluacionAddComponent },
  { path: 'registro-autoevaluaciones/edit/:id', component: RegistroAutoevaluacionAddComponent },

  { path: 'materiaDictadas', component: MateriaDictadasComponent, pathMatch: 'full' },
  { path: 'materiaDictada/:id', component: MateriaDictadaComponent },
  { path: 'addMateriaDictada/:ids', component: MateriaDictadaAddeditComponent },
  { path: 'materiaDictadas/edit/:id', component: MateriaDictadaAddeditComponent },

  { path: 'registro-nota-alumno', component: RegistroNotaAlumnoComponent },
  { path: 'addRegistroEvaluacionAlumno/:id', component: RegistroEvaluacionAlumnoAddComponent },

  { path: 'registro-representante', component: RegistroRepresentanteComponent },
  { path: 'registro-representante-madre', component: RegistroRepresentanteMadreComponent },
  { path: 'registro-representante-tutor', component: RegistroRepresentanteTutorComponent },
  
  { path: 'registrarse', component: RegistrarseComponent },
  { path: 'inicio', component: InicioComponent },

  { path: 'imprimir-rude', component: ImprimirRudeComponent },

  { path: 'institucion', component: InstitucionesComponent, pathMatch: 'full' },
  { path: 'institucion/:id', component: InstitucionComponent },
  { path: 'addInstitucion', component: InstitucionAddeditComponent },
  { path: 'institucion/edit/:id', component: InstitucionAddeditComponent },

  { path: 'perfil-administrador', component: PerfilAdministradorComponent },
  { path: 'perfil-usuario', component: PerfilUsuarioComponent },
  { path: 'addPerfilUsuario/:id/:entidad', component: PerfilUsuarioComponent },
  
  { path: 'asignarHorario', component: HorarioEstudianteComponent },

  { path: 'estudianteCurso', component: EstudianteCursosComponent, pathMatch: 'full' },
  { path: 'estudianteCurso/:id', component: EstudianteCursoComponent },
  { path: 'addEstudianteCurso/:ids', component: EstudianteCursoAddeditComponent },
  { path: 'estudianteCurso/edit/:id', component: EstudianteCursoAddeditComponent },

  { path: 'asistencia', component: AsistenciasComponent },
  { path: 'asistencia/:id', component: AsistenciaComponent },
  { path: 'addAsistencia', component: AsistenciaAddeditComponent },
  { path: 'asistencia/edit/:id', component: AsistenciaAddeditComponent },
  { path: 'asistenciaEstudiantes', component: ListaEstudiantesComponent },

  { path: 'calendario-vista', component: CalendarioVistaComponent },

  { path: 'calificacion', component: CalificacionesComponent, pathMatch: 'full' },
  { path: 'calificacion/:id', component:  CalificacionComponent },
  { path: 'addCalificacion/:ids', component:  CalificacionAddeditComponent },
  { path: 'calificacion/edit/:id', component:  CalificacionAddeditComponent },


  { path: 'regNotas', component: RegNotassComponent, pathMatch: 'full' },
  { path: 'regNotas/:id', component:  RegNotasComponent },
  { path: 'addRegNotas', component:  RegNotasAddeditComponent },
  { path: 'regNotas/edit/:id', component:  RegNotasAddeditComponent },

  { path: 'evaluacionContinua', component: EvaluacionContinuaComponent},

  { path: 'inicioCurso', component: InicioCursoComponent},
  { path: 'perfilAdministrador', component: PerfilAdmComponent},
  
  { path: '**', redirectTo: '/' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
