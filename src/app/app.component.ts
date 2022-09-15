import { Component, OnInit } from '@angular/core';
import { StoriesService } from './services/stories-services';
import { StoryItem, StoryDetails, UserData } from './model/stories.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'hacker-stories';
  storiesId: number[];
  storyLimit: number;
  storyDetails: StoryDetails;
  storyDataView: StoryDetails[];

  storyImage = '../assets/lorem-ipsum.jpg';

  constructor(
    public storiesService: StoriesService,
  ) {
    this.storiesId = [];
    this.storyLimit = 10;
    this.storyDataView = [];
    this.storyDetails = {
      id: 0,
      title: '',
      url: '',
      time: 0,
      score: 0,
      authorId: '',
      authorKarmaScore: 0,
      storyImage: '',
    }
  }

  getStoryModel(): StoryDetails {
    return {
      id: 0,
      title: '',
      url: '',
      time: 0,
      score: 0,
      authorId: '',
      authorKarmaScore: 0,
      storyImage: '',
    };
  }

  getStories(stories: number[], counter: number) {
      var storyId = stories[counter];

      if (storyId === undefined) {
        return;
      }

      this.storiesService.fetchStoryDetails(storyId).subscribe((storyData: StoryItem) => {
        this.storiesService.fetchUserStoryData(storyData.by).subscribe((userData: UserData) => {
          
          const objModel = this.getStoryModel();

          objModel.id = storyId;
          objModel.title = storyData.title;
          objModel.url = storyData.url;
          objModel.time = storyData.time;
          objModel.score = storyData.score;
          objModel.authorId = userData.id;
          objModel.authorKarmaScore = userData.karma;
          objModel.storyImage = this.storyImage;
          
          this.storyDataView.push(objModel)

          counter ++;

          if (typeof(stories[counter]) !== undefined) {
            this.getStories(stories, counter);
          } else {
            console.log('storyDataView', this.storyDataView);
          }
        })
        
        
      })

  }

  ngOnInit(): void {
    this.storyDataView = [];
    this.storiesService.fetchHackerStories().subscribe((data: number[]) => {
      this.storiesId = this.getMultipleRandom(data, this.storyLimit)
      if(this.storiesId.length > 0) {
          this.getStories(this.storiesId, 0);
      }

    })

  }

  getMultipleRandom = (data: number[], length: number) => {
    const shuffled = [...data].sort(() => 0.5 - Math.random());
  
    return shuffled.slice(0, length);
  }
}
