import { rest } from 'msw'

const handlers = [
  rest.get('https://api.nasa.gov/planetary/apod', (req, res, ctx) => {
    const MOCK_DATA = [
      {
        copyright: '\nAndy Ermolli\n',
        date: '2022-10-26',
        explanation:
          "When does a nebula look like a comet?  In this crowded starfield, covering over two degrees within the high flying constellation of the Swan (Cygnus), the eye is drawn to the Cocoon Nebula. A compact star forming region, the cosmic Cocoon punctuates a nebula bright in emission and reflection on the left, with a long trail of interstellar dust clouds to the right, making the entire complex appear a bit like a comet. Cataloged as IC 5146, the central bright head of the nebula spans about 10 light years, while the dark dusty tail spans nearly 100 light years.  Both are located about 2,500 light years away. The bright star near the bright nebula's center, likely only a few hundred thousand years old, supplies power to the nebular glow as it helps clear out a cavity in the molecular cloud's star forming dust and gas. The long dusty filaments of the tail, although dark in this visible light image, are themselves hiding stars in the process of formation, stars that can be seen at infrared wavelengths.",
        hdurl: 'https://apod.nasa.gov/apod/image/2210/CocoonWide_Ermolli_5937.jpg',
        media_type: 'image',
        service_version: 'v1',
        title: 'Cocoon Nebula Wide Field',
        url: 'https://apod.nasa.gov/apod/image/2210/CocoonWide_Ermolli_960.jpg',
      },
      {
        copyright: 'Neelam and Ajay Talwar',
        date: '2022-10-27',
        explanation:
          "On October 25th, Sun and New Moon set together as seen from Agra, India. Their close conjunction near the western horizon, a partial solar eclipse, was captured in this elevated view in hazy skies near the solitary dome of the Taj Mahal. Of course, the partial solar eclipse was also seen from most of Europe, northern Africa, the Middle East, and western parts of Asia. This eclipse was the last of two solar eclipses (both partial eclipses) in 2022. But the next Full Moon will slide through planet Earth's shadow on November 7/8, in a total lunar eclipse.",
        hdurl: 'https://apod.nasa.gov/apod/image/2210/2022-10-25pseTaj.jpg',
        media_type: 'image',
        service_version: 'v1',
        title: 'Sunset, Moonset, Taj Mahal',
        url: 'https://apod.nasa.gov/apod/image/2210/2022-10-25pseTaj600h.jpg',
      },
      {
        copyright: 'Petr Horalek',
        date: '2022-10-28',
        explanation:
          "History's first known periodic comet Halley (1P/Halley) returns to the inner Solar System every 75 years or so. The famous comet made its last appearance to the naked-eye in 1986. But dusty debris from Comet Halley can be seen raining through planet Earth's skies twice a year during two annual meteor showers, the Eta Aquarids in May and the Orionids in October. Including meteors near the shower maximum on October 21, this composite view compiles Orionid meteors captured from years 2015 through 2022. About 47 bright meteors are registered in the panoramic night skyscape. Against a starry background extending along the Milky Way, the Orionid meteors all seem to radiate from a point just north of Betelgeuse in the familiar constellation of the Hunter. In the foreground are mountains in eastern Slovakia near the city of Presov.",
        hdurl: 'https://apod.nasa.gov/apod/image/2210/2016-2022_Orionids_Pano_1500px.png',
        media_type: 'image',
        service_version: 'v1',
        title: 'Seven Years of Halley Dust',
        url: 'https://apod.nasa.gov/apod/image/2210/2016-2022_Orionids_Pano_1100px_0.jpg',
      },
      {
        copyright: 'Capella Observatory Team',
        date: '2022-10-29',
        explanation:
          "Part of a dark expanse that splits the crowded plane of our Milky Way galaxy, the Aquila Rift arcs through planet Earth's skies near bright star Altair. In eerie silhouette against the Milky Way's faint starlight, its dusty molecular clouds likely contain raw material to form hundreds of thousands of stars and astronomers search the dark clouds for telltale signs of star birth. This telescopic close-up looks toward the region at a fragmented Aquila dark cloud complex identified as LDN 673, stretching across a field of view slightly wider than the full moon. In the scene, visible indications of energetic outflows associated with young stars include the small red tinted nebulosity RNO 109 above and right of center, and Herbig-Haro object HH32 below. These dark clouds might look scary, but they're estimated to be some 600 light-years away. At that distance, this field of view spans about 7 light-years.",
        hdurl: 'https://apod.nasa.gov/apod/image/2210/LDN673.jpg',
        media_type: 'image',
        service_version: 'v1',
        title: 'LDN 673: Dark Clouds in Aquila',
        url: 'https://apod.nasa.gov/apod/image/2210/LDN673_1024.jpg',
      },
      {
        copyright: '\nStéphane Vetter\n(Nuits sacrées)\n\n',
        date: '2022-10-30',
        explanation:
          'What spooky planet is this? Planet Earth of course, on a dark and stormy night in 2013 at Hverir, a geothermally active area along the volcanic landscape in northeastern Iceland. Triggered by solar activity, geomagnetic storms produced the auroral display in the starry night sky. The ghostly towers of steam and gas are venting from fumaroles and danced against the eerie greenish light. For now, auroral apparitions are increasing as our Sun approaches a maximum in its 11 year solar activity cycle. And pretty soon, ghostly shapes may dance in your neighborhood too.',
        hdurl: 'https://apod.nasa.gov/apod/image/2210/Hverir_Vetter_1300.jpg',
        media_type: 'image',
        service_version: 'v1',
        title: 'Night on a Spooky Planet',
        url: 'https://apod.nasa.gov/apod/image/2210/Hverir_Vetter_960.jpg',
      },
      {
        copyright: "\nMark Hanson and \nMike Selby;\nText: \nMichelle Thaller \n(NASA's \nGSFC)\n",
        date: '2022-10-31',
        explanation:
          'What is the most spook-tacular nebula in the galaxy?   One contender is LDN 43, which bears an astonishing resemblance to a vast cosmic bat flying amongst the stars on a dark Halloween night.  Located about 1400 light years away in the constellation Ophiuchus, this molecular cloud is dense enough to block light not only from background stars, but from wisps of gas lit up by the nearby reflection nebula LBN 7.  Far from being a harbinger of death, this 12-light year-long filament of gas and dust is actually a stellar nursery.  Glowing with eerie light, the bat is lit up from inside by dense gaseous knots that have just formed young stars.    Celebrate: Halloween With NASA Online',
        hdurl: 'https://apod.nasa.gov/apod/image/2210/LDN43_SelbyHanson_3993.jpg',
        media_type: 'image',
        service_version: 'v1',
        title: 'LDN 43: The Cosmic Bat Nebula',
        url: 'https://apod.nasa.gov/apod/image/2210/LDN43_SelbyHanson_960.jpg',
      },
      {
        date: '2022-11-01',
        explanation:
          "Why is the Lobster Nebula forming some of the most massive stars known? No one is yet sure.  Cataloged as NGC 6357, the Lobster Nebula houses the open star cluster Pismis 24 near its center -- a home to unusually bright and massive stars.  The overall red glow near the inner star forming region results from the emission of ionized hydrogen gas.   The surrounding nebula, featured here, holds a complex tapestry of gas, dark dust, stars still forming, and newly born stars.  The intricate patterns are caused by complex interactions between interstellar winds, radiation pressures, magnetic fields, and gravity.  The image was taken with DOE's Dark Energy Camera on the 4-meter Blanco Telescope at the Cerro Tololo Inter-American Observatory in Chile. NGC 6357 spans about 400 light years and lies about 8,000 light years away toward the constellation of the Scorpion.",
        hdurl: 'https://apod.nasa.gov/apod/image/2211/Lobster_Blanco_4000.jpg',
        media_type: 'image',
        service_version: 'v1',
        title: 'NGC 6357: The Lobster Nebula',
        url: 'https://apod.nasa.gov/apod/image/2211/Lobster_Blanco_960.jpg',
      },
      {
        date: '2022-11-02',
        explanation:
          "Watch for three things in this unusual eclipse video.  First, watch for a big dark circle to approach from the right to block out more and more of the Sun. This dark circle is the Moon, and the video was made primarily to capture this partial solar eclipse last week. Next, watch a large solar prominence hover and shimmer over the Sun's edge. A close look will show that part of it is actually falling back to the Sun. The prominence is made of hot plasma that is temporarily held aloft by the Sun's changing magnetic field. Finally, watch the Sun's edge waver. What is wavering is a dynamic carpet of hot gas tubes rising and falling through the Sun's chromosphere -- tubes known as spicules. The entire 4-second time-lapse video covers a time of about ten minutes, although the Sun itself is expected to last another 5 billion years.   Partial Solar Eclipse in October 2022: Notable Submissions to APOD",
        media_type: 'video',
        service_version: 'v1',
        title: 'A Partial Eclipse of an Active Sun',
        url: 'https://www.youtube.com/embed/7dh5VL5YGoA?rel=0',
      },
    ]

    return res(ctx.status(200), ctx.json(MOCK_DATA))
  }),
]

export default handlers
