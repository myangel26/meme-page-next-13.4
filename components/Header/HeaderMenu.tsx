import Link from "next/link";
import { useGlobalState } from "../../state";

const HeaderMenu = () => {

    const [categories, ] = useGlobalState('categories');

    const handleOpenCategory = (_evt: any) => {
        const eleHeaderMenu = document.getElementsByClassName('js-ass1-header__nav') as HTMLCollectionOf<HTMLElement>;
        const styleHeaderMenu = eleHeaderMenu[0].style.display;
        if (styleHeaderMenu === 'none') {
            eleHeaderMenu[0].style.display = 'block';
        }else {
            eleHeaderMenu[0].style.display = 'none';
        }
    }

    return (
        <>
            <nav>
                <ul className="ass1-header__menu" onClick={handleOpenCategory}>
                    <li>
                        <span style={{ cursor: 'pointer' }}>Danh mục</span>
                        <div className="ass1-header__nav js-ass1-header__nav" style={{ display: "none" }}>
                            <div className="container">
                                <ul>
                                    {
                                        categories &&
                                        categories.map((cate) => {
                                            return (
                                                <li key={cate.id}>
                                                    <Link href={'/categories/[cateid]'} as={`/categories/${cate.id}`}>
                                                        { cate.text }
                                                    </Link>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    </li>
                    
                </ul>
            </nav>
        </>
    )
}

export default HeaderMenu;