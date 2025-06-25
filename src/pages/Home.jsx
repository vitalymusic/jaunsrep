import { Carousel } from 'nuka-carousel';

const img1  =  'https://placehold.jp/3d4070/ffffff/600x150.png';
const img2  = 'https://placehold.jp/0ced63/ffffff/600x150.png';
const img3 = 'https://placehold.jp/eddb0c/ffffff/600x150.png';
function Home() {
    return (
        <>
            <Carousel showArrows="always" showDots="true" wrapMode="wrap"  scrollDistance="slide" className='flex flex-wrap' autoplay={true} autoplayInterval={5000}>
                <img src={img1} />
                <img src={img2} />
                <img src={img3} />
            </Carousel>
            <h1>Galvenā</h1>

            
        </>

    );
}

export default Home;