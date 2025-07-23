import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Select } from 'src/ui/select';

import clsx from 'clsx'

import styles from './ArticleParamsForm.module.scss';

import { useState, useRef, FormEvent, useEffect } from 'react';

import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

import { ArticleStateType, 
	defaultArticleState, 
	fontFamilyOptions, 
	OptionType, 
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr
	} from 'src/constants/articleProps';
import { Article } from '../article/Article';

export type formState = {
	fontFamilyOption: OptionType;
	fontColor: OptionType;
	backgroundColor: OptionType;
	contentWidth: OptionType;
	fontSizeOption: OptionType;
}

export const ArticleParamsForm = ({ formState, setFormState, defaultState}: {formState: ArticleStateType; setFormState: (state: ArticleStateType) => void; defaultState: ArticleStateType}) => {

	// Состояние сайдбара
	const [isAsideOpen, setIsAsideOpen] = useState(false);
	const asideRef = useRef<HTMLDivElement>(null);

	// Текущее состояние формы
	const [currentFormState, setCurrentFormState] = useState<ArticleStateType>(formState);

	// Сбросить текущее состояние форрмы при изменении formState
	useEffect(() => {
		setCurrentFormState(formState);
	}, [formState]);

	// Кнопка Сбросить 
	const handleReset = () => {
		setCurrentFormState(defaultState)
		setFormState(defaultState);
	}

	// Кнопка Применить
	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		setFormState(currentFormState);
		// setIsAsideOpen(false);
	}

	useOutsideClickClose({
		isOpen: isAsideOpen,
		rootRef: asideRef,
		onClose: () => setIsAsideOpen(false),
		onChange: setIsAsideOpen,
	})

	return (
		<>
			<ArrowButton isOpen={isAsideOpen} onClick={() => setIsAsideOpen(!isAsideOpen)} />
			<aside 
				className={clsx(styles.container, { [styles.open]: isAsideOpen} )} 
				ref={asideRef}
				>
				<form 
				className={styles.form}
				onReset={handleReset}
				onSubmit={handleSubmit}
				>
					<Text 
						as='h2' 
						size={31} 
						weight={800} 
						uppercase>
							Задайте параметры
					</Text>

					<Select 
						options={fontFamilyOptions} 
						title='шрифт'
						selected ={currentFormState.fontFamilyOption}
						onChange={(option) => setCurrentFormState({ ...currentFormState, fontFamilyOption: option })}
					/>

					<RadioGroup 
						title="размер шрифта"
						name="fontSize"
						options={fontSizeOptions}
						selected={currentFormState.fontSizeOption}
						onChange={(option) => setCurrentFormState({ ...currentFormState, fontSizeOption: option})}
					/>

					<Select 
						options={fontColors} 
						title='цвет шрифта'
						selected ={currentFormState.fontColor}
						onChange={(option) => setCurrentFormState({ ...currentFormState, fontColor: option })}
					/>

					<Separator/>

					<Select 
						options={backgroundColors} 
						title='цвет фона'
						selected ={currentFormState.backgroundColor}
						onChange={(option) => setCurrentFormState({ ...currentFormState, backgroundColor: option })}
					/>

					<Select 
						options={contentWidthArr} 
						title='ширина контента'
						selected ={currentFormState.contentWidth}
						onChange={(option) => setCurrentFormState({ ...currentFormState, contentWidth: option })}
					/>
					
					
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
