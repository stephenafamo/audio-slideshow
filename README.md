# audio-slideshow
This script helps create a slideshow that is controlled by an audio file.
Useful to create a tutorial or give a speech with slides.
see a demo [HERE](https://stephenafamo.com/audio-slideshow)

## Usage Instructions

1. Download the file `audio-slideshow.js`
2. Include it in your html
3. Create a parent HTML element for your slides. Note, each direct child will be treated as an individual slide
4. include an audio elemnent and add the attribute `data-audio-show="IdOfSlidesELement`
5. For each direct child of the parent element set the time the slide is supposed to come into view in secs with the attribute `data-slide-start`. This is relative to the playback time of the audio element e.g. `<p data-slide-start="5" id="2">It will make a slideshow out of any valid HTML!!!</p>`. Note, you must also set the id of the element.
6. Any child element missing either the `data-slide-start` or `id` attribute will be ignored.
7. It is better to set the child elements by default `style="display: none;"`. This will also be done by the script but the elements will flash for a bit before they are hidden.

### Example 
    
            <div>
                <audio controls data-audio-show="slideShow">
                    <source src="/media/audio.wav" type="audio/wav" />
                </audio>
            </div>
            <div id="slideShow">
                <p data-slide-start="0" id="1">This is a demo of how the audio slideshow works</p>
                <p data-slide-start="5" id="2">It will make a slideshow out of any valid HTML!!!</p>
                <p data-slide-start="10" id="3">{`<div>`}</p>
                <p data-slide-start="12" id="4">TEXT!</p>
                <p data-slide-start="14" id="5"><img src="/my-image.jpg" alt="me" /></p>
                <p data-slide-start="15" id="6">SVG</p>
                <p data-slide-start="17" id="7">It will do that</p>
                <p data-slide-start="19" id="8">Click -> <a href="https://github.com/stephenafamo/audio-slideshow">Link to github repository</a></p>
            </div>
