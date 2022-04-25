import {Component, OnInit,} from '@angular/core';
import {RepoService} from '../../sericies/repo.service'
import {Repo} from '../../Repo'

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.css']
})
export class ReposComponent implements OnInit {
  repos: Repo[] = []
  loading: boolean = false
  errorText: string = ''


  constructor(private repoService: RepoService) {
  }

  ngOnInit(): void {
  }


  onTextChange(event: any) {

    // очищаем прошлые результаты
    this.repos = []
    this.errorText = ''
    // генерируем проверку на долгую загрузку
    let loadingID = setTimeout(() => {
      this.loading = true
      console.log(this.loading)
    }, 1000)

    this.repoService.getRepos(event.target.value)
      .subscribe(
        (repos) => {
          // при удачной загрузке показываем репозитории и убираем текст ошибки, если он был вдруг
          this.repos = []
          this.repos = repos.items
          this.errorText = ''
        },
        (err) => {
          // при неудачной загрузке показываем текст ошибки
          this.errorText = err.error.message
        },
        () => {
          // при любом исходе убираем долгую загрузку и зачищаем таймер
          this.loading = false
          clearTimeout(loadingID)
        }
      )


  }
}
