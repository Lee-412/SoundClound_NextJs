'use client'

import WaveTrack from '@/components/track/wave.track';
import { useSearchParams } from 'next/navigation'

const DetailTrackPage = (props: any
    // { params }: { params: { slug: string } }
) => {
    const { params } = props;

    const searchParams = useSearchParams()
    const search = searchParams.get('audio')

    return (
        <>
            <WaveTrack />
        </>

    )
}
export default DetailTrackPage; 