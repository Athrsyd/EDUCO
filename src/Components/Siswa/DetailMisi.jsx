import { useEffect } from 'react'

const DetailMisi = ({ isOpen, misi, onClose, lampiran = true }) => {
    useEffect(() => {
        if (!isOpen) return undefined

        const handleEsc = (event) => {
            if (event.key === 'Escape') {
                onClose()
            }
        }

        window.addEventListener('keydown', handleEsc)
        return () => window.removeEventListener('keydown', handleEsc)
    }, [isOpen, onClose])

    if (!isOpen || !misi) return null

    return (
        <div
            className="fixed inset-0 z-9999 backdrop-blur-xs flex items-center justify-center bg-black/40 px-3 md:px-8"
            onClick={onClose}
            role="presentation"
        >
            <article
                role="dialog"
                aria-modal="true"
                aria-label="Detail misi"
                className="w-full max-w-4xl rounded-2xl md:rounded-3xl bg-accent p-3 md:p-6 shadow-2xl"
                onClick={(event) => event.stopPropagation()}
            >
                <div className="text-center text-last">
                    <h3 className="text-lg md:text-4xl font-bold leading-tight">
                        Misi : {misi.namaMisi}
                    </h3>
                    <p className="mt-1 text-base md:text-3xl font-semibold">Oleh : {misi.namaGuru}</p>
                </div>

                <div className="mx-auto mt-3 md:mt-5 h-1 w-11/12 rounded-full bg-primary" />

                <div className="mt-3 md:mt-6 grid grid-cols-3 gap-2 md:gap-4 justify-center items-center">
                    <section className="rounded-2xl h-full bg-last p-2.5 md:p-5">
                        <h4 className="text-sm md:text-2xl font-bold text-primary">Petunjuk :</h4>
                        <p className="mt-2 text-[10px] leading-tight md:text-base md:leading-relaxed font-medium text-secondary wrap-break-words">
                            *{misi.petunjuk}*
                        </p>
                    </section>

                    <section className="rounded-2xl h-full flex flex-col justify-between">
                        <div className="rounded-t-2xl h-1/2 border-2 border-accent bg-last p-2 md:p-4">
                            <h4 className="text-[11px] md:text-lg font-bold text-primary text-center">Kuantitas pengerjaan :</h4>
                            <p className="mt-2 md:mt-3 text-center text-xl md:text-2xl font-extrabold text-primary">
                                {misi.target}x
                            </p>
                            <p className="text-center text-sm md:text-xl font-bold text-primary">Pengerjaan</p>
                        </div>

                        <div className="mt-2 md:mt-4 h-1/2 rounded-b-2xl border-2 border-accent bg-last p-2 md:p-4 text-center">
                            <p className="text-[11px] md:text-2xl font-bold text-primary">Capaian anda :</p>
                            <p className="text-2xl md:text-5xl font-extrabold text-primary">
                                {misi.pengerjaan}/{misi.target}
                            </p>
                        </div>
                    </section>

                    <section className="rounded-2xl h-2/3 bg-last p-2.5 md:p-5 flex items-center justify-center">
                        <button
                            type="button"
                            className="rounded-full bg-secondary px-4 py-2 md:px-8 md:py-3 text-sm md:text-3xl font-bold text-last transition-transform duration-150 hover:scale-[1.03]"
                        >
                            Selesaikan
                        </button>
                    </section>
                </div>
                {lampiran && (
                    <div className="w-full text-primary font-bold h-64 rounded-2xl mt-10 bg-white flex items-start justify-start ">
                        <h1 className='ml-10 mt-7'>Lampiran</h1>
                        
                    </div>
                )}
            </article>
        </div>
    )
}

export default DetailMisi