import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

//import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './token.interceptor';
import { LoginComponent } from './login/login.component';

import { AutoevaluacionesComponent } from './autoevaluacion/autoevaluaciones/autoevaluaciones.component';
import { AutoevaluacionComponent } from './autoevaluacion/autoevaluacion.component';
import { AutoevaluacionAddeditComponent } from './autoevaluacion/autoevaluacion-addedit/autoevaluacion-addedit.component';
import { AutoevaluacionService } from './services/autoevaluacion.service';

import { CalendariosComponent } from './calendario/calendarios/calendarios.component';
import { CalendarioComponent } from './calendario/calendario.component';
import { CalendarioAddeditComponent } from './calendario/calendario-addedit/calendario-addedit.component';
import { CalendarioService } from './services/calendario.service';

import { CategoriaComponent } from './categoria/categoria.component';
import { CategoriasComponent } from './categoria/categorias/categorias.component';
import { CategoriaAddeditComponent } from './categoria/categoria-addedit/categoria-addedit.component';
import { CategoriaService } from './services/categoria.service';

import { CursosComponent } from './curso/cursos/cursos.component';
import { CursoComponent } from './curso/curso.component';
import { CursoAddeditComponent } from './curso/curso-addedit/curso-addedit.component';
import { CursoService } from './services/curso.service';

import { EstudiantesComponent } from './estudiante/estudiantes/estudiantes.component';
import { EstudianteComponent } from './estudiante/estudiante.component';
import { EstudianteAddeditComponent } from './estudiante/estudiante-addedit/estudiante-addedit.component';
import { EstudianteService } from './services/estudiante.service';

import { HorariosComponent } from './horario/horarios/horarios.component';
import { HorarioComponent } from './horario/horario.component';
import { HorarioAddeditComponent } from './horario/horario-addedit/horario-addedit.component';
import { HorarioService } from './services/horario.service';

import { RolesComponent } from './rol/roles/roles.component';
import { RolComponent } from './rol/rol.component';
import { RolAddeditComponent } from './rol/rol-addedit/rol-addedit.component';
import { RolService } from './services/rol.service';

import { UsuariosComponent } from './usuario/usuarios/usuarios.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { UsuarioAddeditComponent } from './usuario/usuario-addedit/usuario-addedit.component';
import { UsuarioService } from './services/usuario.service';

import { EstudianteMateriasComponent } from './estudiante-materia/estudiante-materias/estudiante-materias.component';
import { EstudianteMateriaComponent } from './estudiante-materia/estudiante-materia.component';
import { EstudianteMateriaAddeditComponent } from './estudiante-materia/estudiante-materia-addedit/estudiante-materia-addedit.component';
import { EstudianteMateriaService } from './services/estudiante-materia.service';

import { EvaluacionProfesoresComponent } from './evaluacion-profesor/evaluacion-profesores/evaluacion-profesores.component';
import { EvaluacionProfesorComponent } from './evaluacion-profesor/evaluacion-profesor.component';
import { EvaluacionProfesorAddeditComponent } from './evaluacion-profesor/evaluacion-profesor-addedit/evaluacion-profesor-addedit.component';
import { EvaluacionProfesorService } from './services/evaluacion-profesor.service';

import { FotoComponent } from './foto/foto.component';
import { FotosComponent } from './foto/fotos/fotos.component';
import { FotoAddeditComponent } from './foto/foto-addedit/foto-addedit.component';
import { FotoService } from './services/foto.service';

import { InstitucionComponent } from './institucion/institucion.component';
import { InstitucionesComponent } from './institucion/instituciones/instituciones.component';
import { InstitucionAddeditComponent } from './institucion/institucion-addedit/institucion-addedit.component';
import { InstitucionService } from './services/institucion.service';

import { MateriaComponent } from './materia/materia.component';
import { MateriasComponent } from './materia/materias/materias.component';
import { MateriaAddeditComponent } from './materia/materia-addedit/materia-addedit.component';
import { MateriaService } from './services/materia.service';

import { MateriaDictadaComponent } from './materia-dictada/materia-dictada.component';
import { MateriaDictadasComponent } from './materia-dictada/materia-dictadas/materia-dictadas.component';
import { MateriaDictadaAddeditComponent } from './materia-dictada/materia-dictada-addedit/materia-dictada-addedit.component';
import { MateriaDictadaService } from './services/materia-dictada.service';

import { NotaComponent } from './nota/nota.component';
import { NotasComponent } from './nota/notas/notas.component';
import { NotaAddeditComponent } from './nota/nota-addedit/nota-addedit.component';
import { NotaService } from './services/nota.service';

import { NotificacionComponent } from './notificacion/notificacion.component';
import { NotificacionesComponent } from './notificacion/notificaciones/notificaciones.component';
import { NotificacionAddeditComponent } from './notificacion/notificacion-addedit/notificacion-addedit.component';
import { NotificacionService } from './services/notificacion.service';

import { ParaleloComponent } from './paralelo/paralelo.component';
import { ParalelosComponent } from './paralelo/paralelos/paralelos.component';
import { ParaleloAddeditComponent } from './paralelo/paralelo-addedit/paralelo-addedit.component';
import { ParaleloService } from './services/paralelo.service';

import { ParametroComponent } from './parametro/parametro.component';
import { ParametrosComponent } from './parametro/parametros/parametros.component';
import { ParametroAddeditComponent } from './parametro/parametro-addedit/parametro-addedit.component';
import { ParametroService } from './services/parametro.service';

import { PeriodoComponent } from './periodo/periodo.component';
import { PeriodosComponent } from './periodo/periodos/periodos.component';
import { PeriodoAddeditComponent } from './periodo/periodo-addedit/periodo-addedit.component';
import { PeriodoService } from './services/periodo.service';

import { ProfesorComponent } from './profesor/profesor.component';
import { ProfesoresComponent } from './profesor/profesores/profesores.component';
import { ProfesorAddeditComponent } from './profesor/profesor-addedit/profesor-addedit.component';
import { ProfesorService } from './services/profesor.service';

import { RepresentanteComponent } from './representante/representante.component';
import { RepresentantesComponent } from './representante/representantes/representantes.component';
import { RepresentanteAddeditComponent } from './representante/representante-addedit/representante-addedit.component';
import { RepresentanteService } from './services/representante.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


//Angular material
import {A11yModule} from '@angular/cdk/a11y';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import {OverlayModule} from '@angular/cdk/overlay';

// Funcionalidades
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';
import { RegistroUsuariosComponent } from './registro-usuario/registro-usuarios/registro-usuarios.component';
import { RegistroUsuarioAddeditComponent } from './registro-usuario/registro-usuario-addedit/registro-usuario-addedit.component';
import { InicioComponent } from './inicio/inicio.component';
import { RegistroEstudianteComponent } from './registro-estudiante/registro-estudiante.component';
import { RegistroEstudiantesComponent } from './registro-estudiante/registro-estudiantes/registro-estudiantes.component';
import { RegistroEstudianteAddeditComponent } from './registro-estudiante/registro-estudiante-addedit/registro-estudiante-addedit.component';
import { RegistroEstudianteEditarComponent } from './registro-estudiante/registro-estudiante-editar/registro-estudiante-editar.component';
import { RegistrarseComponent } from './registrarse/registrarse.component';
import { RudeComponent } from './rude/rude.component';
import { RudesComponent } from './rude/rudes/rudes.component';
import { RudeAddeditComponent } from './rude/rude-addedit/rude-addedit.component';
import { LoginProfesorComponent } from './login-profesor/login-profesor.component';
import { LoginRepresentanteComponent } from './login-representante/login-representante.component';
import { LoginEstudianteComponent } from './login-estudiante/login-estudiante.component';
import { RegistroRudeComponent } from './registro-rude/registro-rude.component';
import { RegistroRudesComponent } from './registro-rude/registro-rudes/registro-rudes.component';
import { RegistroRudeAddeditComponent } from './registro-rude/registro-rude-addedit/registro-rude-addedit.component';
import { RegistroRepresentanteComponent } from './registro-representante/registro-representante.component';
import { RegistroRudeEditarComponent } from './registro-rude/registro-rude-editar/registro-rude-editar.component';
import { RegistroNotaComponent } from './registro-nota/registro-nota.component';
import { RegistroNotaAutoevaluacionComponent } from './registro-nota/registro-nota-autoevaluacion/registro-nota-autoevaluacion.component';
import { HorarioEstudianteComponent } from './horario-estudiante/horario-estudiante.component';
import { MapaComponent } from './mapa/mapa.component';
import { RegistroNotaAlumnoComponent } from './registro-nota/registro-nota-alumno/registro-nota-alumno.component';
import { RegistroAutoevaluacionAddComponent } from './registro-autoevaluacion/registro-autoevaluacion-add/registro-autoevaluacion-add.component';
import { RegistroEvaluacionAlumnoAddComponent } from './registro-evaluacion-alumno/registro-evaluacion-alumno-add/registro-evaluacion-alumno-add.component';
import { RegistroEvaluacionAlumnoEditComponent } from './registro-evaluacion-alumno/registro-evaluacion-alumno-edit/registro-evaluacion-alumno-edit.component';
import { LoginAdministradorComponent } from './login-administrador/login-administrador.component';
import { RegistroRepresentanteMadreComponent } from './registro-representante/registro-representante-madre/registro-representante-madre.component';
import { RegistroRepresentanteTutorComponent } from './registro-representante/registro-representante-tutor/registro-representante-tutor.component';
import { ImprimirRudeComponent } from './imprimir-rude/imprimir-rude.component';
import { PerfilAdministradorComponent } from './perfil-administrador/perfil-administrador.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { EstudianteCursoComponent } from './estudiante-curso/estudiante-curso.component';
import { EstudianteCursosComponent } from './estudiante-curso/estudiante-cursos/estudiante-cursos.component';
import { EstudianteCursoAddeditComponent } from './estudiante-curso/estudiante-curso-addedit/estudiante-curso-addedit.component';
import { EstudianteCursoService } from './services/estudiante-curso.service';
import { RegistroAutoevaluacionesComponent } from './registro-autoevaluacion/registro-autoevaluaciones/registro-autoevaluaciones.component';
import { AsistenciaComponent } from './asistencia/asistencia.component';
import { AsistenciasComponent } from './asistencia/asistencias/asistencias.component';
import { AsistenciaAddeditComponent } from './asistencia/asistencia-addedit/asistencia-addedit.component';
import { CalendarioVistaComponent } from './calendario-vista/calendario-vista.component';
import { ListaEstudiantesComponent } from './asistencia/lista-estudiantes/lista-estudiantes.component';
import { RegistroCalificacionComponent } from './registro-nota/registro-calificacion/registro-calificacion.component';
import { CalificacionComponent } from './calificacion/calificacion.component';
import { CalificacionesComponent } from './calificacion/calificaciones/calificaciones.component';
import { CalificacionAddeditComponent } from './calificacion/calificacion-addedit/calificacion-addedit.component';
import { EvaluacionContinuaComponent } from './evaluacion-continua/evaluacion-continua.component';
import { RegNotasComponent } from './reg-notas/reg-notas.component';
import { RegNotassComponent } from './reg-notas/reg-notass/reg-notass.component';
import { RegNotasAddeditComponent } from './reg-notas/reg-notas-addedit/reg-notas-addedit.component';
import { InicioProfesorComponent } from './profesor/inicio-profesor/inicio-profesor.component';
import { ProfesorEditarComponent } from './profesor/profesor-editar/profesor-editar.component';
import { InicioRepresentanteComponent } from './representante/inicio-representante/inicio-representante.component';
import { RepresentanteEditarComponent } from './representante/representante-editar/representante-editar.component';
import { InicioAdministradorComponent } from './login-administrador/inicio-administrador/inicio-administrador.component';
import { AdministradorComponent } from './login-administrador/administrador/administrador.component';
import { AdministradoresComponent } from './login-administrador/administradores/administradores.component';
import { AdministradorEditarComponent } from './login-administrador/administrador-editar/administrador-editar.component';
import { InicioCursoComponent } from './inicio-curso/inicio-curso.component';
import { PerfilAdmComponent } from './perfil-adm/perfil-adm.component';


@NgModule({
  declarations: [
    AppComponent,
    RolesComponent,
    RolComponent,
    RolAddeditComponent,
    CategoriaComponent,
    CategoriasComponent,
    CategoriaAddeditComponent,
    HorariosComponent,
    HorarioComponent,
    HorarioAddeditComponent,
    UsuariosComponent,
    UsuarioComponent,
    UsuarioAddeditComponent,
    AutoevaluacionesComponent,
    AutoevaluacionComponent,
    AutoevaluacionAddeditComponent,
    CalendariosComponent,
    CalendarioComponent,
    CalendarioAddeditComponent,
    CursosComponent,
    CursoComponent,
    CursoAddeditComponent,
    EstudiantesComponent,
    EstudianteComponent,
    EstudianteAddeditComponent,
    EstudianteMateriasComponent,
    EstudianteMateriaComponent,
    EstudianteMateriaAddeditComponent,
    EvaluacionProfesoresComponent,
    EvaluacionProfesorComponent,
    EvaluacionProfesorAddeditComponent,
    FotoComponent,
    FotosComponent,
    FotoAddeditComponent,
    InstitucionComponent,
    InstitucionesComponent,
    InstitucionAddeditComponent,
    MateriaComponent,
    MateriasComponent,
    MateriaAddeditComponent,
    MateriaDictadaComponent,
    MateriaDictadasComponent,
    MateriaDictadaAddeditComponent,
    NotaComponent,
    NotasComponent,
    NotaAddeditComponent,
    NotificacionComponent,
    NotificacionesComponent,
    NotificacionAddeditComponent,
    ParaleloComponent,
    ParalelosComponent,
    ParaleloAddeditComponent,
    ParametroComponent,
    ParametroAddeditComponent,
    PeriodoComponent,
    PeriodosComponent,
    PeriodoAddeditComponent,
    ParametrosComponent,
    ProfesorComponent,
    ProfesoresComponent,
    ProfesorAddeditComponent,
    RepresentanteComponent,
    RepresentantesComponent,
    RepresentanteAddeditComponent,
    // Funcionalidades
    LoginComponent,
    RegistroUsuarioComponent,
    RegistroUsuariosComponent,
    RegistroUsuarioAddeditComponent,
    InicioComponent,
    RegistroEstudianteComponent,
    RegistroEstudiantesComponent,
    RegistroEstudianteAddeditComponent,
    RegistroEstudianteEditarComponent,
    RegistrarseComponent,
    RudeComponent,
    RudesComponent,
    RudeAddeditComponent,
    LoginProfesorComponent,
    LoginRepresentanteComponent,
    LoginEstudianteComponent,
    RegistroRudeComponent,
    RegistroRudesComponent,
    RegistroRudeAddeditComponent,
    RegistroRepresentanteComponent,
    RegistroRudeEditarComponent,
    RegistroNotaComponent,
    RegistroNotaAutoevaluacionComponent,
    HorarioEstudianteComponent,
    MapaComponent,
    RegistroNotaAlumnoComponent,
    RegistroAutoevaluacionAddComponent,
    RegistroEvaluacionAlumnoAddComponent,
    RegistroEvaluacionAlumnoEditComponent,
    LoginAdministradorComponent,
    RegistroRepresentanteMadreComponent,
    RegistroRepresentanteTutorComponent,
    ImprimirRudeComponent,
    PerfilAdministradorComponent,
    PerfilUsuarioComponent,
    HorarioEstudianteComponent,
    EstudianteCursoComponent,
    EstudianteCursosComponent,
    EstudianteCursoAddeditComponent,
    RegistroAutoevaluacionesComponent,
    AsistenciaComponent,
    AsistenciasComponent,
    AsistenciaAddeditComponent,
    CalendarioVistaComponent,
    ListaEstudiantesComponent,
    RegistroCalificacionComponent,
    CalificacionComponent,
    CalificacionesComponent,
    CalificacionAddeditComponent,
    EvaluacionContinuaComponent,
    RegNotasComponent,
    RegNotassComponent,
    RegNotasAddeditComponent,
    InicioProfesorComponent,
    ProfesorEditarComponent,
    InicioRepresentanteComponent,
    RepresentanteEditarComponent,
    InicioAdministradorComponent,
    AdministradorComponent,
    AdministradoresComponent,
    AdministradorEditarComponent,
    InicioCursoComponent,
    PerfilAdmComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,

    //Angular material
    A11yModule,
    ClipboardModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    PortalModule,
    ScrollingModule,
    MatMenuModule,
    MatIconModule,
    //NgbModule
    OverlayModule,
    

  ],
  providers: [
    RolService,
    CalendarioService,
    CategoriaService,
    CursoService,
    EstudianteService,
    HorarioService,
    UsuarioService,
    AutoevaluacionService,
    EstudianteMateriaService,
    EvaluacionProfesorService,
    FotoService,
    InstitucionService,
    MateriaService,
    MateriaDictadaService,
    NotaService,
    NotificacionService,
    ParaleloService,
    ParametroService,
    PeriodoService,
    ProfesorService,
    RepresentanteService,
    EstudianteCursoService,
    AuthGuard, {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
