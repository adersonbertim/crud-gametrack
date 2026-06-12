import { NgModule } from "@angular/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { MatCardModule } from "@angular/material/card";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { MatChipsModule } from "@angular/material/chips";

const MaterialComponents = [
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule,
    MatDividerModule,
    MatCardModule,
    MatProgressSpinner,
    MatIconModule,
    MatSelectModule,
    MatChipsModule
];

// É um configurador de módulos do Angular, que importa e exporta os componentes do Angular Material para serem usados em outros módulos da aplicação.
@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents],
})
export class MaterialModule {}