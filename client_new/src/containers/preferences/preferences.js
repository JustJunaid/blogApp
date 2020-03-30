import React, { useState } from 'react'
// import SelectPreferences from '../../components/SelectPreferences/SelectPreferences'

const categories = [
	{
		_id: '5d11217d1c9d440000465111',
		Technology: [
			'Web Development',
			'Artificial Intelligence',
			'Computer Science'
		]
	},
	{
		_id: '5d1121da1c9d440000465112',
		Fashion: ['Jeans', 'Perfumery', 'Hairstyles']
	},
	{
		_id: '5d1122441c9d440000465113',
		Sex: ['Oral', 'Rough', 'Threesome', 'Gang Bang', 'BBW']
	}
]

export const Preferences = () => {
	const [selectedCategory, setSelectedCategory] = useState(
		Object.keys(categories[0])[0]
	)
	const [preferences, setPreferences] = useState({
		[selectedCategory]: []
	})
	console.log('preferences', preferences)
	const [selectedSubCat, setSelectedSubCat] = useState([1, 2, 3, 4])
	const [subCategories, setSubCategories] = useState(
		Object.values(categories[0])
	)

	console.log('subCategories', subCategories)
	const selectCategory = e => {
		setSelectedCategory(e.currentTarget.value)
		categories.map(category => {
			if (Object.keys(category)[0] === e.currentTarget.value)
				setSubCategories(Object.values(category))
		})
	}

	const handleCheckbox = e => {
		console.log('alskjfla', e.target.name)
		setPreferences({ ...preferences, [selectedCategory]: [...e.target.name] })
	}

	return (
		<div>
			{categories.map((category, i) => (
				<button key={i} value={Object.keys(category)} onClick={selectCategory}>
					{Object.keys(category)}
				</button>
			))}
			{/* <SelectPreferences /> */}
			<form>
				{subCategories[1].map((subCategory, i) => (
					<>
						<label key={subCategory}>
							{subCategory}
							<input
								name={subCategory}
								type="checkbox"
								onChange={handleCheckbox}
							/>
						</label>
						<br />
					</>
				))}
			</form>
			{selectedSubCat.map((subCat, i) => (
				<button key={i} value={subCat}>
					{subCat}
				</button>
			))}
		</div>
	)
}
