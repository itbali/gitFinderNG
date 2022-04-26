import {Component, OnInit,} from '@angular/core';
import {RepoService} from '../../services/repo.service'
import {Repo} from '../../Repo'
import {fromEvent} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router'

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.css'],
})
export class ReposComponent implements OnInit {
  repos: Repo[] = []
  loading: boolean = false
  errorText: string = ''
  params: string = ''

  constructor(
    private repoService: RepoService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {

    // при загрузке проверяем адресную строку
    this.route
      .queryParams
      .subscribe(params => {
        // если в адресной строке есть квери запросы - обрабатываем
        if (Object.keys(params).length !== 0) {
          this.repoService.getRepos(params['q']).subscribe(
            (repos) => {
              // при удачной загрузке зачищаем старые репозитории и записываем новые
              this.repos = []
              this.repos = repos.items
              //убираем текст ошибки, если он был вдруг или пишем что не найдено
              if (repos.items.length === 0) {
                this.errorText = 'No repos'
              } else {
                this.errorText = ''
              }
              // убираем загрузку
              this.loading = false
            },
            (err) => {
              // при неудачной загрузке показываем текст ошибки
              this.loading = false
              this.errorText = err.error.message
            },
          )
        }
      })

    const node: Element = document.querySelector('#searchInput')!

    const input$ = fromEvent(node, 'input');
    input$.subscribe({
      next: (event: any) => {



        //если что-то написали и это не пробелы, то инициируем запрос на серв
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
                this.loading = false
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

          //записываем в адресную строку текущий запрос
          this.router.navigate([''], {
            queryParams: {
              q: `${event.target.value}+in:name`,
              per_page: `20`
            }
          })

        } else {
          this.repos = []
          this.errorText = 'минимум 2 символа'
        }
      },
      error: (err: any) => console.log(`Oops... ${err}`),
      complete: () => console.log(`Complete!`)
    });

  }
}
