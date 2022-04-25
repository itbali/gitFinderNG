import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Observable, } from 'rxjs'
import {ApiRespons, } from '../Repo'

@Injectable({
  providedIn: 'root'
})
export class RepoService {

  private apiUrl = `https://api.github.com/search/repositories`
  constructor(private http:HttpClient) { }

  getRepos(title:string): Observable<ApiRespons>{
    return this.http.get<ApiRespons>(this.apiUrl+'?q='+title+'+in:name&per_page=20')
  }
}
