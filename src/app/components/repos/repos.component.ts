import { Component, OnInit, } from '@angular/core';
import {RepoService} from '../../sericies/repo.service'
import {Repo} from '../../Repo'

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.css']
})
export class ReposComponent implements OnInit {
  repos:Repo[] = []
  loading:boolean = false
  errorText:string = ''


  constructor(private repoService: RepoService) { }

  ngOnInit(): void {
    // this.repoService.getRepos('ilyuha_dr').subscribe((repos)=> this.repos = repos.items)
  }

  onTextChange(event:any) {
    this.repoService.getRepos(event.target.value).subscribe((repos)=> this.repos = repos.items)

  }
}
