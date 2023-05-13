import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'day33workshop';

  thought!:string
  thoughts: string[] = []

  canShare=false

  ngOnInit(): void {
    this.canShare = !!navigator.share
  }

  share(text: string) {
    console.info('thoughts to share: ', text)
    console.log(typeof text)
    const data: any = {
      title: 'Share a thought',
      text,
      //url: 'https://google.com'
    }
    navigator.share(data)
      .then(result => {
        alert('Shared')
        // this.thought.clearForm()
      })
      .catch(err => alert('JSON: ' + JSON.stringify(err)))
  }



  display(thought:string) {
    this.thoughts.push(thought);
  }
}
