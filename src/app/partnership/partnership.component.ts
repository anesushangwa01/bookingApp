import { Component } from '@angular/core';

@Component({
  selector: 'app-partnership',
  standalone: true,
  imports: [],
  templateUrl: './partnership.component.html',
  styleUrl: './partnership.component.css'
})
export class PartnershipComponent {

  imageSrc = 'assets/etho.png';
  imageSrc1 = 'assets/indrive.png';
  imageSrc2 = 'assets/southafrica.png';
  imageSrc3 = 'assets/uber.png';
  imageSrc4 = 'assets/zim.png'; // Adjust the path based on your assets folder
  imageAlt = 'parterners';

}
