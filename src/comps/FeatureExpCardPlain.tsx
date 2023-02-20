import React, { useContext } from 'react'
import { toast } from 'react-toastify'
import styled from 'styled-components'

import { FeatureExpDataRequest, FeatureExpDeleteRequest } from '../api/FeaturesApi'
import { FeatureContext } from '../context/FeaturesContext'
import { ResumeContext } from '../context/ResumeContext'

interface Props {
	expBlockState: boolean
}

const FeatureExpCardPlain: React.FC<Props> = (props: Props) => {
	const { expBlockState, } = props

	const { featureExpData, setFeatureExpData } = useContext(FeatureContext)
	const { setResumeExpData } = useContext(ResumeContext)

	// add to resume
	const handleAddExp = (id: string) => {
		console.log(id);
		// console.log("asd");
		// let d = data.find(x => x._id === id)
		// //check if already added
		// var check = resumeExpData?.filter(d => d._id === id)
		// console.log('this check', check);
		// if (check?.length !== 0) {
		//     return
		// }
		// setResumeExpData!(resumeExpData => [...resumeExpData, d])
	}

	const handleDelete = async (id: string) => {
		console.log('btn clicked', id);

		const deleteResponse = await FeatureExpDeleteRequest(id)
		// handle deleteResponse
		console.log(deleteResponse);
		if (deleteResponse.status === 200) {
			const allExp = await FeatureExpDataRequest()
			setFeatureExpData!(allExp.data)
		}
		if (deleteResponse.error) {
			console.log('delete request error', deleteResponse.error);
			toast.warning("error removing item")
		}
	}

	return (
		<CardHolder expBlockState={expBlockState} className='overflow-y-scroll max-h' >
			{
				featureExpData?.map(d =>
					<Card key={d._id} className='m-2 bg-slate-200 shadow-2xl rounded-xl p-2' >
						<h1> {d.company} </h1>
						< h1 > {d.position} </h1>
						< p > {d.start} </p>
						< p > {d.end} </p>
						<ul className='list-disc px-4 mt-2'>
							{d?.description?.map(l => {
								return (<li> {l} </li>)
							})}
						</ul>
						<div className='flex gap-2 align-middle mt-2'>
							<button className='px-2 bg-blue-400 rounded text-white'
								onClick={() => handleAddExp(d._id!)}>
								add
							</button>
							<button className='px-2 hover:bg-blue-600 bg-blue-400 rounded text-white'
								onClick={() => handleDelete(d?._id!)}>
								Remove from list
							</button>
						</div>
					</Card>
				)}
		</CardHolder>
	)


}


export default FeatureExpCardPlain;

const Card = styled.div`
    transition: all;
    transition-duration: 2s;
    height: auto;
    margin-bottom: 2px;
    padding: 12px;
    margin: 12px;
`
type CardHolderProps = {
	expBlockState: boolean
}

const CardHolder = styled.div<CardHolderProps>`
    transition: all;
    transition-duration: 1s;
    max-height: ${(props) => { return props.expBlockState ? 20 : 0 }}rem;
    ::-webkit-scrollbar{
        width: 12px;
    };
    ::-webkit-scrollbar-track {
        background: #4a8dd8;
        margin: 12px;
    };
    ::-webkit-scrollbar-thumb {
        background-color: blue;
        border-radius: 20px;
        border: 3px solid #4a8dd8;
    };
`   