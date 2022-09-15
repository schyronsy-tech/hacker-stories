import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StoryItem, UserData  } from '../model/stories.model';

@Injectable({
    providedIn: 'root'
})
export class StoriesService {

  constructor(public http: HttpClient){}

  	public baseUrl: string = 'https://hacker-news.firebaseio.com/v0/';

    public fetchHackerStories(): Observable<number[]> {

      const url: string = `${this.baseUrl}/topstories.json`;

      return this.http.get(url) as Observable<number[]>;
    }

    public fetchStoryDetails(storyId: number): Observable<StoryItem> {

        const url: string = `${this.baseUrl}item/${storyId}.json`;
  
        return this.http.get(url) as Observable<StoryItem>;
    }

    public fetchUserStoryData(userId: string): Observable<UserData> {

        const url: string = `${this.baseUrl}user/${userId}.json`;
  
        return this.http.get(url) as Observable<UserData>;
    }

}
