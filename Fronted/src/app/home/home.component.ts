import { Component } from '@angular/core';
import { TopnavComponent } from './topnav/topnav.component';
import { MenuComponent } from './menu/menu.component';
import { ContainerComponent } from './container/container.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TopnavComponent,MenuComponent,ContainerComponent,FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
