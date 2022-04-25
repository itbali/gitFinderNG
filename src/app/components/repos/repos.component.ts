import {Component, OnInit,} from '@angular/core';
import {RepoService} from '../../services/repo.service'
import {Repo} from '../../Repo'
import {fromEvent, Observable, Subscription} from 'rxjs';


@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.css'],
})
export class ReposComponent implements OnInit {
  repos: Repo[] = []
  loading: boolean = false
  errorText: string = ''


  constructor(private repoService: RepoService) {
  }

  ngOnInit(): void {
    const node: Element = document.querySelector('#search-input')!

    const input$ = fromEvent(node, 'input');
    input$.subscribe({
      next: (event: any) => {


        if (event.target.value.trim().length > 1) {
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
                if (repos.items.length === 0) {
                  this.errorText = 'No repos'
                } else {
                  this.errorText = ''
                }
              },
              (err) => {
                // при неудачной загрузке показываем текст ошибки
                this.loading = false
                clearTimeout(loadingID)
                this.errorText = err.error.message
              },
              () => {
                // при любом исходе убираем долгую загрузку и зачищаем таймер
                clearTimeout(loadingID)
              }
            )
        } else {
          this.errorText = 'минимум 2 символа'
        }
      },
      error: (err: any) => console.log(`Oops... ${err}`),
      complete: () => console.log(`Complete!`)
    });

  }
}
