const GenderCheckbox = ({ onCheckboxChange, selectedGender }) => {
	return (
		<div className='mt-3 flex gap-4'>
			<div className='form-control'>
				<label className='flex cursor-pointer items-center gap-2'>
					<input
						type='radio'
						name='gender'
						className='radio radio-sm border-2 border-black checked:bg-yellow-300'
						checked={selectedGender === "male"}
						onChange={() => onCheckboxChange("male")}
					/>
					<span className='text-base font-medium text-black'>Male</span>
				</label>
			</div>
			<div className='form-control'>
				<label className='flex cursor-pointer items-center gap-2'>
					<input
						type='radio'
						name='gender'
						className='radio radio-sm border-2 border-black checked:bg-yellow-300'
						checked={selectedGender === "female"}
						onChange={() => onCheckboxChange("female")}
					/>
					<span className='text-base font-medium text-black'>Female</span>
				</label>
			</div>
		</div>
	);
};
export default GenderCheckbox;
