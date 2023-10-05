import { useRouter } from "next/router";
import { useState } from "react"

export default function HeaderSearch() {
    const router = useRouter();
    const [queryStr, setQueryStr] = useState('');

    const handleSearchForm = (_evt: any) => {
        const value = _evt.target.value;
        setQueryStr(value);
    }

    const handleSubmit = (_evt: any) => {
        _evt.preventDefault();
        if (queryStr) {
            router.push(`/search?q=${queryStr}`);
        }
    }

    return (
        <>
            <div className="ass1-header__search">
                <form action="#" onSubmit={ handleSubmit }>
                    <label>
                        <input
                            value={ queryStr }
                            onChange={ handleSearchForm }
                            type="search"
                            name="search-text"
                            className="form-control"
                            placeholder="Nhập từ khóa ..."
                        />
                        <i className="icon-Search" />
                    </label>
                </form>
            </div>
        </>
    )
}