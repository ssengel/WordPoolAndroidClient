import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Word } from "../models/word";
import { ErrorHandlerService } from "./error-handler.service";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class WordService {
  private userId: String = localStorage.getItem("userId");
  private readonly url = "http://localhost:8080/user/" + this.userId + "/word/";

  constructor(private http: HttpClient, private err: ErrorHandlerService) {}

  getAll() {
    return this.http
      .get<Word[]>(this.url);
     
  }

  getById(id: String) {
    return this.http
      .get<Word>(this.url + id);
  
  }

  create(word: Word) {
    return this.http
      .post(this.url, word);
  }

  deleteById(id: String){
    return this.http
      .delete(this.url + id);
  }
  update(word: Word){
    return this.http
      .put<Word>(this.url + word._id , word);
  }
}
