import { Component, OnInit, Input } from '@angular/core';
import {Repo} from "../../Repo";

@Component({
  selector: 'app-repo-item',
  templateUrl: './repo-item.component.html',
  styleUrls: ['./repo-item.component.css']
})
export class RepoItemComponent implements OnInit {
  @Input() repo: Repo | undefined ;

  constructor() { }

  ngOnInit(): void {
  }

}
