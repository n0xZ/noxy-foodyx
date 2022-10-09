// Generated by https://quicktype.io

export interface RecipeResponse {
	count: number
	results: Recipe[]
}

export interface Recipe {
	created_at: number
	updated_at: number
	approved_at: number
	renditions: Rendition[]
	keywords: string
	facebook_posts: any[]
	prep_time_minutes: number | null
	tags: Tag[]
	is_shoppable: boolean
	total_time_tier: TotalTimeTier
	total_time_minutes: number | null
	video_ad_content: null | string
	canonical_id: string
	nutrition_visibility: NutritionVisibility
	user_ratings: UserRatings
	id: number
	aspect_ratio: AspectRatio
	seo_title: string
	yields: string
	video_id: number | null
	thumbnail_url: string
	credits: Brand[]
	is_one_top: boolean
	servings_noun_plural: ServingsNounPlural
	sections: Section[]
	nutrition: Nutrition
	inspired_by_url: null
	original_video_url: null | string
	buzz_id: null
	show: Show
	description: string
	draft_status: DraftStatus
	country: Country
	language: Language
	servings_noun_singular: ServingsNounSingular
	brand_id: number | null
	thumbnail_alt_text: string
	cook_time_minutes: number | null
	brand: Brand | null
	topics: Topic[]
	promotion: Promotion
	video_url: null | string
	beauty_url: null | string
	slug: string
	show_id: number
	name: string
	num_servings: number
	instructions: Instruction[]
	compilations: Compilation[]
	tips_and_ratings_enabled: boolean
}

export enum AspectRatio {
	The11 = '1:1',
	The169 = '16:9',
	The916 = '9:16',
}

export interface Brand {
	image_url?: string
	name: string
	id?: number
	slug?: string
	type?: BrandType
}

export enum BrandType {
	Brand = 'brand',
	Community = 'community',
	Internal = 'internal',
}

export interface Compilation {
	thumbnail_alt_text: string
	video_url: string
	beauty_url: null | string
	slug: string
	country: Country
	show: Show[]
	created_at: number
	name: string
	buzz_id: null
	video_id: number
	aspect_ratio: AspectRatio
	is_shoppable: boolean
	keywords: null
	language: Language
	thumbnail_url: string
	approved_at: number
	id: number
	facebook_posts: any[]
	description: null | string
	draft_status: DraftStatus
	canonical_id: string
	promotion: Promotion
}

export enum Country {
	Us = 'US',
}

export enum DraftStatus {
	Published = 'published',
}

export enum Language {
	Eng = 'eng',
}

export enum Promotion {
	Full = 'full',
}

export interface Show {
	id: number
	name: Name
}

export enum Name {
	BringMe = 'Bring Me',
	Tasty = 'Tasty',
}

export interface Instruction {
	temperature: number | null
	id: number
	position: number
	display_text: string
	start_time: number
	appliance: null | string
	end_time: number
}

export interface Nutrition {
	carbohydrates?: number
	fiber?: number
	updated_at?: Date
	protein?: number
	fat?: number
	calories?: number
	sugar?: number
}

export enum NutritionVisibility {
	Auto = 'auto',
}

export interface Rendition {
	container: Container
	poster_url: string
	url: string
	duration: number
	aspect: Aspect
	width: number
	name: string
	file_size: number | null
	bit_rate: number | null
	content_type: ContentType
	minimum_bit_rate: number | null
	maximum_bit_rate: number | null
	height: number
}

export enum Aspect {
	Landscape = 'landscape',
	Portrait = 'portrait',
	Square = 'square',
}

export enum Container {
	Mp4 = 'mp4',
	Ts = 'ts',
}

export enum ContentType {
	ApplicationVndAppleMpegurl = 'application/vnd.apple.mpegurl',
	VideoMp4 = 'video/mp4',
}

export interface Section {
	components: Component[]
	name: null | string
	position: number
}

export interface Component {
	ingredient: Ingredient
	id: number
	position: number
	measurements: Measurement[]
	raw_text: string
	extra_comment: string
}

export interface Ingredient {
	updated_at: number
	name: string
	created_at: number
	display_plural: string
	id: number
	display_singular: string
}

export interface Measurement {
	unit: Unit
	quantity: string
	id: number
}

export interface Unit {
	name: string
	display_plural: string
	display_singular: string
	abbreviation: string
	system: System
}

export enum System {
	Imperial = 'imperial',
	Metric = 'metric',
	None = 'none',
}

export enum ServingsNounPlural {
	Donuts = 'donuts',
	PurpleServings = 'Servings',
	Servings = 'servings',
	ServingsNounPluralServings = 'servings ',
}

export enum ServingsNounSingular {
	Donut = 'donut',
	Serving = 'serving',
	ServingsNounSingularServing = 'Serving',
}

export interface Tag {
	name: string
	id: number
	display_name: string
	type: TagType
}

export enum TagType {
	Appliance = 'appliance',
	CookingStyle = 'cooking_style',
	Cuisine = 'cuisine',
	Dietary = 'dietary',
	Difficulty = 'difficulty',
	Equipment = 'equipment',
	Healthy = 'healthy',
	Holiday = 'holiday',
	Meal = 'meal',
	Occasion = 'occasion',
	Seasonal = 'seasonal',
}

export interface Topic {
	slug: string
	name: string
}

export interface TotalTimeTier {
	tier: Tier
	display_tier: DisplayTier
}

export enum DisplayTier {
	Under15Minutes = 'Under 15 minutes',
	Under30Minutes = 'Under 30 minutes',
}

export enum Tier {
	Under15_Minutes = 'under_15_minutes',
	Under30_Minutes = 'under_30_minutes',
}

export interface UserRatings {
	count_negative: number
	count_positive: number
	score: number | null
}