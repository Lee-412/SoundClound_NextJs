'use client'

import WaveTrack from '@/components/track/wave.track';
import { useSearchParams } from 'next/navigation'
import { Container } from '@mui/material';
const DetailTrackPage = (props: any
    // { params }: { params: { slug: string } }
) => {
    const { params } = props;

    const searchParams = useSearchParams()
    const search = searchParams.get('audio')

    return (
        <Container>
            <WaveTrack />
        </Container>

    )
}
export default DetailTrackPage; 